import React from "react";
import { Modal } from "antd";
import DisapproveImage from "../../../assets/images/disapproveImg.svg";
import PropTypes from "prop-types";

const DisapproveModel = ({ show, onCancel }) => {
  return (
    <div className="modal-popup">
      <Modal
        className="delete-modal"
        centered
        visible={show}
        destroyOnClose={true}
        onCancel={onCancel}
        footer={null}
      >
        <img src={DisapproveImage} alt="success" className="mx-auto d-block" />
        <div className="d-flex align-items-center justify-content-center mt-5 text-center fs22">
          Sale entry has been <br /> rejected <br />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-4">
          <button className="btn btn-blue" onClick={onCancel}>
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
};

DisapproveModel.propTypes = {
  showModel: PropTypes.bool,
  onCancel: PropTypes.func
};

export default DisapproveModel;
