import React, { useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Select = props => {
  let bindValue;
  let bindLabel;
  let placeHolder;
  let selected;
  if (props.options) {
    bindLabel = props.options.bindLabel;
    bindValue = props.options.bindValue;
    placeHolder = props.options.placeHolder;
    selected = props.options.selected;
  }

  const elements = useMemo(() => {
    const newElements = props.items?.map((obj, i) => {
      if (typeof obj === "object") {
        return (
          <option value={obj[bindValue]} key={i + 1}>
            {obj[bindLabel]}
          </option>
        );
      } else if (typeof obj === "string" || typeof obj === "number") {
        return (
          <option value={obj} key={i + 1}>
            {obj}
          </option>
        );
      }
      return null;
    });

    if (selected && newElements) {
      newElements.unshift(
        <option
          value=""
          disabled
          key={newElements.length + 1}
          defaultValue={selected}
        >
          {placeHolder}
        </option>
      );
    }

    return newElements;
  }, [props.items, bindValue, bindLabel, placeHolder, selected]);

  const className = classNames(
    `input-border-blue form-control rounded-0 form-control`,
    props.inputStyle
  );
  return (
    <select
      onChange={props.onSelectChange}
      className={`${className}`}
      id={props.id}
      name={props.name}
      value={props.value}
      disabled={props.disabled}
    >
      {elements}
    </select>
  );
};

Select.propTypes = {
  items: PropTypes.array,
  onSelectChange: PropTypes.func,
  inputStyle: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.any,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.string
};

export default Select;
