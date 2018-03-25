import React from 'react';
import { connect } from 'react-redux';
import { FormSection, Field, Fields, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import cx from 'classnames';
import { RadioGroup, Radio } from 'react-radio-group';
import validate from '../../validation';
import renderBirthdaySelector from './renderBirthdaySelector';

const whereOpts = [
  { value: 'internet', label: 'internet'},
  { value: 'radio', label: 'radio'},
  { value: 'tv', label: 'tv'},
  { value: 'friends', label: 'friends'},
  { value: 'social', label: 'social'},
]

let RegisterSecondPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting, touched, monthValue, yearValue, genderValue } = props
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="Form__Title">
        Signup
      </div>
      <ul className="Form__Progress">
        <li className="is-active">1</li>
        <li className="is-active">2</li>
        <li>3</li>
      </ul>
      <div className="Form__Content">
        <FormSection
          name="birthday"
          className="Form__FieldGroup"
        >
          <Fields
            names={[ 'day', 'month', 'year' ]}
            component={renderBirthdaySelector}
            monthValue={monthValue}
            yearValue={yearValue}
          />
        </FormSection>
        <p className="Form__ContentTitle">
          Gender
        </p>
        <div className="Form__RadioGroup">
          <div className="Form__RadioWrapper">
            <Field className={`Form__RadioInput`} name="gender" component="input" type="radio" value="male" />
            <label className="Form__RadioBtn"> Male</label>
          </div>
          <div className="Form__RadioWrapper">
            <Field className="Form__RadioInput" name="gender" component="input" type="radio" value="female" />
            <label className="Form__RadioBtn"> Female</label>
          </div>
          <div className="Form__RadioWrapper">
            <Field className="Form__RadioInput" name="gender" component="input" type="radio" value="unspecified" />
            <label className="Form__RadioBtn"> Unspecified</label>
          </div>
        </div>
        <p className="Form__ContentTitle">
          Where did you hear about us?
        </p>
        <div className="Form__FieldGroup--centered">
          <div className="Form__SelectWrapper--full-width">
            <select
              name="where"
              className={
                cx(`Form__FieldGroupItem${touched && error ? "--error" : ""}`)
              }
            >
              <option value="">Select day...</option>
              {whereOpts.map((place, i) => <option value={place.value} key={i}>{place.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="Form__Footer">
        <button
          type="button"
          className="Form__BtnPrev"
          onClick={previousPage}
        >Previous</button>
        <button
          className="Form__BtnNext"
          type="submit"
          disabled={`${props.invalid ? 'true' : ''}`}
        >Next
          <span className="anticon icon-arrowright"></span>
        </button>
      </div>
    </form>
  )
}

// Decorate with redux-form
RegisterSecondPage = reduxForm({
  form: 'signup',  // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(RegisterSecondPage)

// Decorate with connect to read form values
const selector = formValueSelector('signup') // <-- same as form name
RegisterSecondPage = connect(
  state => {
    const yearValue = selector(state, 'birthday.year')
    const monthValue = selector(state, 'birthday.month')
    return {
      yearValue,
      monthValue,
    }
  }
)(RegisterSecondPage)

export default RegisterSecondPage;
