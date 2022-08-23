import React, { useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Field } from "formik";

const FormikSelect = ({
  id,
  name,
  items: opts = [],
  options: {
    label = "value",
    optValue = "value",
    placeHolder = "",
    selected = true
  },
  inputStyle,
  value,
  onSelectChange,
  disabled = false
}) => {
  const className = useMemo(
    () =>
      classNames(
        `input-border-blue form-control rounded-0 form-control`,
        inputStyle
      ),
    [inputStyle]
  );

  const selectOptions = useMemo(() => {
    const optionList = opts.map(opt => {
      return (
        <option key={opt.id} value={opt[optValue]}>
          {opt[label]}
        </option>
      );
    });

    selected &&
      optionList.unshift(
        <option key="0" value="" disabled defaultValue={true}>
          {placeHolder}
        </option>
      );

    return optionList;
  }, [opts, placeHolder, selected, label, optValue]);

  return (
    <Field
      id={id}
      className={className}
      as="select"
      placeholder={placeHolder}
      value={value}
      onChange={onSelectChange}
      disabled={disabled}
    >
      {selectOptions}
    </Field>
  );
};

FormikSelect.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  onSelectChange: PropTypes.func,
  inputStyle: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.object,
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default FormikSelect;
