import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../validation';
import renderField from './renderField';

const RegisterFirstPage = (props) => {
  const { handleSubmit } = props

  return (
    <form className="Form" role="form" onSubmit={handleSubmit}>
      <div className="Form__Title">
        Signup
      </div>
      <ul className="Form__Progress">
        <li className="is-active">1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <div className="Form__Content">
        <Field
          name="email"
          type="email"
          label="Email"
          component={renderField}
        />
        <Field
          name="password"
          type="password"
          label="Password"
          component={renderField}
        />
        <Field
          name="password_confirm"
          type="password"
          label="Confirm password"
          component={renderField}
        />
      </div>
      <div className="Form__Footer">
        <button
          className="Form__BtnNext"
          type="submit"
          disabled={`${props.invalid ? 'true' : ''}`}
        >
          Next
          <span className="anticon icon-arrowright"></span>
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(RegisterFirstPage);
