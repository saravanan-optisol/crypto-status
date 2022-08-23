import CommonAction from "./CommonAction";
import BaseReducer from "../../utilities/BaseReducer";

export default class CommonReducer extends BaseReducer {
  initialState = {
    showSideMenu: false,
    addNewSales: false,
    collapseSlider: false
  };
  [CommonAction.SHOW_SLIDER_MENU](state, action) {
    return {
      ...state,
      showSideMenu: action.payload
    };
  }
  [CommonAction.ADD_NEW_SALE_DETAILS](state, action) {
    return {
      ...state,
      addNewSales: action.payload
    };
  }
  [CommonAction.COLLAPSE_SLIDER](state, action) {
    return {
      ...state,
      collapseSlider: action.payload
    };
  }
}
