import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "formik";

const FormikInput = ({
  disabled = false,
  hasBorder = false,
  inputStyle,
  placeholder,
  value,
  id,
  name,
  handleChange,
  type = "text",
  maxLength = "250"
}) => {
  const className = useMemo(
    () =>
      classNames(`form-control`, {
        [`${inputStyle} input-border-blue rounded-0`]: !hasBorder
      }),
    [inputStyle, hasBorder]
  );
  return (
    <Field
      as="input"
      autoComplete="new-password"
      type={type}
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

FormikInput.propTypes = {
  disabled: PropTypes.any,
  type: PropTypes.string,
  hasBorder: PropTypes.bool,
  inputStyle: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.any,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  maxLength: PropTypes.string
};

export default FormikInput;
