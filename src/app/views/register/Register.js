import { reduxForm, formValueSelector } from 'redux-form';
import React, {
  Component,
}                     from 'react';
import PropTypes      from 'prop-types';
import cx             from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import { Link }       from 'react-router';
import {
  ErrorAlert,
  WarningAlert
}                     from '../../components';

import RegisterFirstPage from './RegisterFirstPage';
import RegisterSecondPage from './RegisterSecondPage';
import RegisterThirdPage from './RegisterThirdPage';

class Register extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  state = {
    animated: true,
    viewEntersAnim: true,
    page: 1,

    email: '',
    password: '',
    gender: '',

    warning: null,
    month: '',
    year: '',

    birthday: {
      day: '',
      month: '',
      year: ''
    }
  };

  componentDidMount() {
    const { enterRegister } = this.props;
    enterRegister();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { leaveRegister } = this.props;
    leaveRegister();
  }

  render() {
    const selector = formValueSelector('signup')
    const month = selector(this.state, 'birthday.month')
    console.log(month)
    const {
      animated,
      viewEntersAnim,
      email,
      password,
      warning,
      page,
    } = this.state;

    const {
      mutationLoading,
      error,
      onSubmit,
    } = this.props;

    const showResults = values =>
      new Promise(resolve => {
        setTimeout(() => {  // simulate server latency
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
          resolve()
        }, 500)
      })


    return(
      <div className={
        cx({
          'animatedViews': animated,
          'view-enter': viewEntersAnim
        })}>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-lg-offset-4 col-md-offset-3">
            <div className="vertical-center">
              {page === 1 && <RegisterFirstPage onSubmit={this.nextPage} />}
              {page === 2 && <RegisterSecondPage monthValue={month} previousPage={this.previousPage} onSubmit={this.nextPage} />}
              {page === 3 && <RegisterThirdPage previousPage={this.previousPage} onSubmit={showResults} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handlesOnPasswordChange = (event) => {
    console.log('handleOnPasswordChange');
    event.preventDefault();
    // should add some validator before setState in real use cases
    this.setState({ password: event.target.value });
  }

  handlesOnRegister = (event) => {
    event.preventDefault();
    const { registerUser } = this.props;
    const {
      email,
      password,
    } = this.state;
    const { router } = this.context;

    const variables = {
      user: {
        username: email,
        password: password
      }
    };

    const { resetError } = this.props;
    resetError();
    this.setState({ warning: null });

    if (!this.isValidEmail(email)) {
      this.setState({ warning: { message: 'Email is not valid.' } });
      return;
    }

    if (!this.isValidPassword(password)) {
      this.setState({ warning: { message: 'Password is empty or not valid.' } });
      return;
    }

    registerUser({variables})
      .then(
        () => router.push({ pathname: '/protected' })
      )
      .catch(
        (err) => console.log('register user went wrong..., ', err)
      );
  }

  isValidPassword(password = '') {
    // basic validation, better user "validate.js" for real validation
    if (password && password.trim().length > 0) {
      return true;
    }
    return false;
  }

  closeError = (event) => {
    event.preventDefault();
    const { resetError } = this.props;
    resetError();
  }

  closeWarning = event => {
    event.preventDefault();
    this.setState({ warning: null });
  }
}

Register.propTypes= {
  // views props:
  onSubmit:       PropTypes.func.isRequired,
  currentView:    PropTypes.string.isRequired,
  enterRegister:  PropTypes.func.isRequired,
  leaveRegister:  PropTypes.func.isRequired,
  // auth props:
  userIsAuthenticated: PropTypes.bool.isRequired,
  mutationLoading: PropTypes.bool.isRequired,
  // error: PropTypes.object,
  error: PropTypes.string,

  // apollo actions
  registerUser: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired
};

Register.contextTypes = {
  router: PropTypes.object
};

Register = reduxForm({
  form: 'signup',
})(Register);

export default Register;
