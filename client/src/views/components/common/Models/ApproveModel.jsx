import React from "react";
import { Modal } from "antd";
import SuccessIcon from "../../../assets/images/successIcon.svg";
import PropTypes from "prop-types";

const ApproveModel = ({ show, onCancel, approvedBy }) => {
  let useData = localStorage.getItem("userDetails");
  let useDataJson = JSON.parse(useData);
  let userTypeId = useDataJson.User_type.userTypeId;

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
        <img src={SuccessIcon} alt="success" className="mx-auto d-block" />
        <div className="d-flex  align-items-center justify-content-center mt-5 text-center fs22cdd ">
          {approvedBy && userTypeId !== 6 ? (
            "Approved for Finance Review Successfully"
          ) : userTypeId === 6 ? (
            <React.Fragment>
              <ul class="list-group">
                <li class="list-group-item border-0 p-0">
                  Payment status has been updated successfully
                </li>
              </ul>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ul class="list-group">
                <li class="list-group-item border-0 p-0">
                  Executive Assigned Successfully
                </li>
              </ul>
            </React.Fragment>
          )}
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

ApproveModel.propTypes = {
  showModel: PropTypes.bool,
  onCancel: PropTypes.func,
  approvedBy: PropTypes.bool
};

export default ApproveModel;
