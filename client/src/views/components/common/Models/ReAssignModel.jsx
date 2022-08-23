/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import Button from '../../../components/button/Button';
import DashboardAction from "../../../stores/dashboard/DashboardAction";
import AddSaleAction from "stores/addSale/AddSaleAction";

const ReAssignModel = ({
  show,
  onCancel,
  singleSaleData,
  salesExecutive,
  userDetails
}) => {
  const dispatch = useDispatch();
  const [saleExecutive, setSaleExecutive] = useState({});

  const handleChange = e => {
    let { target } = e;
    setSaleExecutive(target.value);
  };

  const handleClick = () => {
    let param = {
      saleId: singleSaleData.saleId,
      reAssignToUserId: saleExecutive
    };
    if (userDetails.User_type.userTypeId === 5) {
      param.type = 1;
      param.assignToUserId = saleExecutive;
      delete param.reAssignToUserId;
      dispatch(AddSaleAction.assignOperationExec(param));
      return;
    }
    dispatch(DashboardAction.ResignSales(param));
  };

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
        <div className="modal-header d-flex align-items-center justify-content-center mx23">
          <h1 className="modal-title fs20 fw-600">Reassign Executive</h1>
        </div>

        <div className="modal-body mt-3">
          <p className="color-grey">
            Currently Assigned to{" "}
            <span className="color-blue">
              {singleSaleData && singleSaleData.createdUser
                ? singleSaleData.createdUser.fullName
                : null}
            </span>
          </p>
          <div className="form-group-type">
            <div className="form-group">
              <select
                name="cityBuilder"
                className="color-grey mt-5"
                onChange={handleChange}
              >
                <option value={""}>Select Sales Execitive</option>
                {salesExecutive && salesExecutive.entity.length
                  ? salesExecutive.entity.map((saleExe, sind) => {
                      return (
                        <option value={saleExe.userId}>
                          {saleExe.fullName}
                        </option>
                      );
                    })
                  : null}
              </select>
              <label
                htmlFor="select"
                className="control-label text-black fs20 mt-4"
              >
                Assign to
              </label>
              <i className="bar"></i>
            </div>
          </div>

          <div className="text-center">
            <button
              type="reset"
              className="btn btn-primary-grey px-4 py-2 fs15 fw-500 mr-2"
              onClick={onCancel}
            >
              {" "}
              Cancel{" "}
            </button>
            <button
              type="submit"
              className="btn btn-primary-orange px-4 py-2 fs15 fw-500"
              onClick={handleClick}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ReAssignModel.propTypes = {
  showModel: PropTypes.bool,
  onCancel: PropTypes.func
};

export default ReAssignModel;
