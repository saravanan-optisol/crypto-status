import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

const FormikTextArea = ({
  disabled = false,
  inputStyle,
  placeholder,
  value,
  id,
  name,
  handleChange,
  maxLength = "350"
}) => {
  const className = `${inputStyle} form-control input-border-blue rounded-0`;
  return (
    <Field
      as="textarea"
      rows="4"
      autoComplete="new-password"
      disabled={disabled}
      placeholder={placeholder}
      className={className}
      value={value}
      id={id}
      name={name}
      onChange={handleChange}
      maxLength={maxLength}
    />
  );
};

FormikTextArea.propTypes = {
  disabled: PropTypes.any,
  inputStyle: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.any,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  maxLength: PropTypes.string
};

export default FormikTextArea;
