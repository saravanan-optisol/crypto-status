import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonLoader } from "antd";

export default function Button({ isLoading = false, ...props }) {
  let className = "";
  if (props.inputbox) {
    className = `${props.btnStyle}`;
  } else {
    className = `btn btn-rounded text-nowrap fs14 px-4 py-1 museosans-regular ${props.btnStyle}`;
  }

  if (isLoading) {
    return (
      <ButtonLoader className={className} loading={isLoading}>
        {!props.right && props.icon && props.icon} {props.label}{" "}
        {props.right && props.icon && props.icon}
      </ButtonLoader>
    );
  }

  return (
    <button
      className={className}
      onClick={props.handleClick}
      disabled={props.disabled}
      id={props.id}
    >
      {!props.right && props.icon && props.icon} {props.label}{" "}
      {props.right && props.icon && props.icon}
    </button>
  );
}

Button.defaultProps = {
  btnStyle: "btn-blue"
};

export const ButtonOutline = ({ icon = null, ...props }) => {
  let className = "";
  if (props.inputbox) {
    className = ` ${props.btnOutlineStyle}`;
  } else {
    className = `btn btn-rounded fs14 px-4 py-2 museosans-regular ${props.btnOutlineStyle}`;
  }

  return (
    <button className={className} onClick={props.handleClick}>
      {props.icon} {props.label}
    </button>
  );
};

ButtonOutline.defaultProps = {
  btnOutlineStyle: "btn-grey-border"
};

ButtonOutline.propTypes = {
  icon: PropTypes.any,
  inputbox: PropTypes.string,
  btnOutlineStyle: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export const ButtonGrey = ({ icon, ...props }) => {
  let className = "";
  if (props.inputbox) {
    className = ` ${props.btnGreyStyle}`;
  } else {
    className = `btn btn-rounded fs14 px-4 pt7 pb7 museosans-regular ${props.btnGreyStyle}`;
  }

  return (
    <button className={className} onClick={props.handleClick}>
      <img src={props.img} alt={props.imgName} width="11" className="mr-2" />{" "}
      {props.icon} {props.label}
    </button>
  );
};

ButtonGrey.defaultProps = {
  btnGreyStyle: "btn-grey",
  icon: null
};

ButtonGrey.propTypes = {};
