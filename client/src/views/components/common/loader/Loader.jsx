import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = fontSize => (
  <LoadingOutlined style={{ fontSize: fontSize }} spin />
);

const Loader = ({
  loading = false,
  children,
  className = "",
  fontSize = 44
}) => {
  return (
    <Spin
      indicator={antIcon(fontSize)}
      spinning={loading}
      className={className}
    >
      {children}
    </Spin>
  );
};

Loader.defaultProps = {
  className: ""
};

Loader.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string
};

export default Loader;
