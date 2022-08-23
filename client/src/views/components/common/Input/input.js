import React from "react";
const Input = ({ disabled = false, maxLength = 250, ...props }) => {
  let className = `form-control`;
  if (!props.hasBorder) {
    className = `input-border-blue form-control ${props.inputStyle}`;
  }
  return (
    <input
      autoComplete="new-password"
      type={props.type}
      disabled={disabled}
      placeholder={props.placeholder}
      className={className}
      value={props.value}
      id={props.id}
      onChange={props.handleChange}
      maxLength={maxLength}
      name={props.name}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      style={{fontSize:props.fontsize}}
    />
  );
};
export const Textarea = props => {
  const className = `input-border-blue form-control rounded ${props.inputStyle}`;
  return (
    <textarea rows="4" placeholder={props.placeholder} className={className} />
  );
};
export const Checkbox = ({ disabled = false, ...props }) => {
  let className;
  if (props.inputStyle) {
    className = `input-border-blue form-control rounded-0 ${props.inputStyle}`;
  }
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={className}
      checked={props.checked}
      id={props.id}
      onChange={props.handleChange}
      disabled={disabled}
    />
  );
};
export const Radiobox = props => {
  let className;
  if (props.inputStyle) {
    className = `input-border-blue form-control rounded-0 ${props.inputStyle}`;
  }
  return (
    <input
      type={props.type}
      className={className}
      checked={props.checked}
      id={props.id}
      name={props.name}
      onChange={props.handleChange}
      value={props.value}
      disabled={props.disabled}
    />
  );
};
// Input.defaultProps = {
//   type: 'btn-blue',
// };
export default Input;
