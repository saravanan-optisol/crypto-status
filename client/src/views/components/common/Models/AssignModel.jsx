/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { Radio } from "antd";
import ApproveModel from "../../../views/components/Models/ApproveModel";
import AddSaleAction from "../../../stores/addSale/AddSaleAction";
import Button from "../../../views/components/button/Button";
import SelectedIcon from "../../../assets/images/selectedType.svg";

const AssignModel = ({
  show,
  onCancel,
  operationExecutive,
  saleData,
  isSubmited
}) => {
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isFinanceReview, setIsFinanceReview] = useState(true);
  const [opExecutive, setOpExecutive] = useState({});
  const [selectedVal, setSelectedVal] = useState("");

  const assignOpExec = useSelector(state => state.addSale.assignOpExec);
  const getSaveSale = useSelector(state => state.addSale.saveSaleDetails);

  let useData = localStorage.getItem("userDetails");
  let useDataJson = JSON.parse(useData);
  let userTypeId = useDataJson.User_type.userTypeId;

  const openModal = () => {
    // eslint-disable-next-line no-undef
    setIsModal(true);
  };
  const radioChange = ({ target }) => {
    let { value } = target;
    setIsFinanceReview(value === 1 ? true : false);
  };

  const handleChange = e => {
    let { target } = e;
    setOpExecutive(target.value);
  };

  const handleClick = () => {
    isSubmited(true);
    if (userTypeId !== 4) {
      let param = {};
      if (isFinanceReview) {
        delete param.reAssignToUserId;
      }
      param = {
        saleId: saleData.saleId,
        assignToUserId: opExecutive,
        type: 1
      };
      setTimeout(() => {
        dispatch(AddSaleAction.assignOperationExec(param));
      }, 700);
    }
  };

  useEffect(() => {
    if (getSaveSale?.status?.status === 200) {
      if (userTypeId === 6) {
        const param = {
          saleId: saleData.saleId,
          type: 1,
          paymentStatus:
            selectedVal === "PaymentReceived"
              ? "Payment Recieved"
              : "Payment Pending"
        };
        setTimeout(() => {
          dispatch(AddSaleAction.SubmitPaymentStatus(param));
        }, 700);
        //dispatch(AddSaleAction.SubmitPaymentStatus(param));
      }
      if (userTypeId === 4) {
        let param = {};
        if (isFinanceReview) {
          delete param.reAssignToUserId;
        }
        param = {
          saleId: saleData.saleId,
          assignToUserId: opExecutive,
          type: 1
        };
        dispatch(AddSaleAction.assignOperationExec(param));
      }
    }
  }, [getSaveSale]);

  useEffect(() => {
    if (assignOpExec && Object.keys(assignOpExec).length) {
      if (assignOpExec.msg !== "Sale disapproved") openModal();
    }
  }, [assignOpExec]);

  const handleSelect = val => {
    setSelectedVal(val);
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
          <h1 className="modal-title fs20 fw-600">Approved & Assign</h1>
        </div>

        <div className="modal-body mt-3">
          {userTypeId !== 6 ? (
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              onChange={radioChange}
            >
              <Radio value={1}>Finance Review</Radio>
              {userTypeId !== 4 ? (
                <Radio value={2}>Assign Executive</Radio>
              ) : (
                ""
              )}
            </Radio.Group>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <div className=" mr-3">
                <Button
                  label="Payment Pending"
                  btnStyle={
                    selectedVal === "PaymentPending"
                      ? "btn-grey-border1 w-70px h-30px radius5 status-active"
                      : "btn-grey-border1  radius5 h-35px w-70px"
                  }
                  className="quality-btn"
                  id="payment"
                  value="PaymentPending"
                  handleClick={() => handleSelect("PaymentPending")}
                />
                {selectedVal === "PaymentPending" ? (
                  <img
                    src={SelectedIcon}
                    alt="selectPayment"
                    className="selected-image"
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                <Button
                  label="Payment Received"
                  btnStyle={
                    selectedVal === "PaymentReceived"
                      ? "btn-grey-border1  w-70px h-30px radius5 status-active"
                      : "btn-grey-border1 radius5 h-35px w-70px"
                  }
                  className="quality-btn"
                  id="payment"
                  value="PaymentReceived"
                  handleClick={() => handleSelect("PaymentReceived")}
                />
                {selectedVal === "PaymentReceived" ? (
                  <img
                    src={SelectedIcon}
                    alt="selectPayment"
                    className="selected-image"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          {!isFinanceReview ? (
            <div className="form-group-type">
              <div className="form-group">
                <select
                  name="cityBuilder"
                  className="color-grey mt-5 "
                  onChange={handleChange}
                >
                  <option value="">Select Operation Executive</option>
                  {operationExecutive &&
                  typeof operationExecutive.entity !== "undefined" &&
                  Array.isArray(operationExecutive.entity)
                    ? operationExecutive.entity.map(({ userId, fullName }) => {
                        return <option value={userId}>{fullName}</option>;
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
          ) : null}

          <div className="text-center mt-5">
            <button
              type="reset"
              className="btn btn-primary-grey px-4 py-2 fs15 fw-500 mr-2"
              onClick={() => onCancel()}
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
      <ApproveModel
        show={isModal}
        onCancel={onCancel}
        approvedBy={isFinanceReview}
      />
    </div>
  );
};

AssignModel.propTypes = {
  showModel: PropTypes.bool,
  onCancel: PropTypes.func,
  isSubmited: PropTypes.func
};

export default AssignModel;
