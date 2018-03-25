import React from 'react';
import cx from 'classnames';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="Form__FieldGroup">
    <label className={
      cx(`Form__Label${touched && error ? "--error" : ""}`)
    }>
      {label}
      &nbsp;
      {touched && error && <span>{error}</span>}
    </label>
    <div>
      <input
        className={
          cx(`Form__Input${touched && error ? "--error" : ""}`)
        }
        {...input}
        type={type}
      />
    </div>
  </div>
)

export default renderField;
