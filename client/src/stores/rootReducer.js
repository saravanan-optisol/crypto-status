import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ToastsReducer from "./toasts/ToastsReducer";
import CryptoReducer from "./crypto/CryptoReducer"

export default history => {
  const reducerMap = {
    router: connectRouter(history),
    toasts: new ToastsReducer().reducer,
    crypto: new CryptoReducer().reducer,
  };

  return combineReducers(reducerMap);
};
