import moment from 'moment';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  }
  if (values.password !== values.password_confirm) {
    errors.password_confirm = 'should match'
  }

  if (!values.gender) {
    errors.gender = 'Required'
  }

  if (values.birthday) {
    if ((moment().diff(`${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`, 'years')) < 18) {
      errors._error = 'You must be at least 18 years old'
    } else if (!values.birthday.day || !values.birthday.month || !values.birthday.year) {
      errors._error = 'Birthday Required'
    }
  }
  return errors
}

export default validate;
