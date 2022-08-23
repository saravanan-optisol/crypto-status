import ActionUtility from "../../utilities/ActionUtility";
import CommonEffect from "./CommonEffect";
import { logout } from "../../utilities/HttpUtility";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";

export default class CommonAction {
  static SHOW_SLIDER_MENU = "CommonAction.SHOW_SLIDER_MENU";
  static REQUEST_LOGOUT = "CommonAction.REQUEST_LOGOUT";
  static ADD_NEW_SALE_DETAILS = "CommonAction.ADD_NEW_SALE_DETAILS";
  static COLLAPSE_SLIDER = "CommonAction.COLLAPSE_SLIDER";
  static ShowSliderMenu = payload => {
    return ActionUtility.createAction(CommonAction.SHOW_SLIDER_MENU, {
      payload
    });
  };

  static requestLogout() {
    return async dispatch => {
      const isSuccess = await ActionUtility.createThunkEffect(
        dispatch,
        CommonAction.REQUEST_LOGOUT,
        CommonEffect.requestLogout
      );
      if (isSuccess instanceof HttpErrorResponseModel) return;
      logout();
    };
  }
  static AddNewSalesDetails = payload => {
    return ActionUtility.createAction(CommonAction.ADD_NEW_SALE_DETAILS, {
      payload
    });
  };
  static CollapseSlider = payload => {
    return ActionUtility.createAction(CommonAction.COLLAPSE_SLIDER, {
      payload
    });
  };
}
