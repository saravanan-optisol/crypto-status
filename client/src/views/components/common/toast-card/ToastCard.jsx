// import styles from './ToastCard.module.scss';

import * as React from "react";
import { connect } from "react-redux";
import ToastStatusEnum from "../../../../constants/ToastStatusEnum";
import ToastsAction from "../../../../stores/toasts/ToastsAction";

const mapStateToProps = (state, ownProps) => ({});

class ToastCard extends React.Component {
  buttonColorMap = {
    [ToastStatusEnum.Error]: "alert-danger",
    [ToastStatusEnum.Warning]: "alert-warning",
    [ToastStatusEnum.Success]: "alert-success",
    [ToastStatusEnum.Info]: "alert-success"
  };

  render() {
    const { item } = this.props;
    return (
      //Alert Classes --> Success = alert-success | Error = alert-danger | Info= alert-info | Warning = alert-warning
      <div className={"toster " + this.buttonColorMap[item.type]}>
        <div className="content">
          <h3 className="head fs18 fw700 text-uppercase"> {item.type} !</h3>
          <p className="description fs14  mb0">{item.message}</p>
        </div>
        <div className="tost-close">
          <em
            className="fa fa-times c-pointer"
            onClick={this._onClickRemoveNotification}
          />
        </div>
      </div>
    );
  }

  _onClickRemoveNotification = (event, data) => {
    this.props.dispatch(ToastsAction.removeById(this.props.item.id));
  };
}

export { ToastCard as Unconnected };
export default connect(mapStateToProps)(ToastCard);
