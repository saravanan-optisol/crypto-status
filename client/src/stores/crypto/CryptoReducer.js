import BaseReducer from "../../utilities/BaseReducer";
import CryptoAction from "./CryptoAction";

export default class CryptoReducer extends BaseReducer {
  initialState = {
    coins: null,
  };
  [CryptoAction.GET_TOP_CRYPTO_FINISHED](state, action) {
    return {
      ...state,
      coins: action.payload.data
    };
  }
}
