import React from "react";
import { Modal } from "antd";
import SuccessIcon from "../../../assets/images/successIcon.svg";
import PropTypes from "prop-types";

const AddSaleModel = ({ show, onCancel }) => {
  return (
    <div className="modal-popup">
      <Modal
        className="delete-modal add-sale-success-modal"
        centered
        visible={show}
        destroyOnClose={true}
        onCancel={onCancel}
        footer={null}
      >
        <img src={SuccessIcon} alt="success" className="mx-auto d-block mt-3" />
        <div className="d-flex  align-items-center justify-content-center mt-4 mb-5 font-weight-bold">
          New Sale Submitted Succesfully
        </div>
      </Modal>
    </div>
  );
};

AddSaleModel.propTypes = {
  showModel: PropTypes.bool,
  onCancel: PropTypes.func
};

export default AddSaleModel;
