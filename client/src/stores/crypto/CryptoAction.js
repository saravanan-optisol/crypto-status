import ActionUtility from "../../utilities/ActionUtility";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import CryptoEffect from "./CryptoEffect";

export default class CryptoAction {
  static GET_TOP_CRYPTO = "CryptoAction.GET_TOP_CRYPTO";
  static GET_TOP_CRYPTO_FINISHED = "CryptoAction.GET_TOP_CRYPTO_FINISHED";

  static getTopCryptos() {
    return async dispatch => {
      const isSuccess = await ActionUtility.createThunkEffect(
        dispatch,
        CryptoAction.GET_TOP_CRYPTO,
        CryptoEffect.getTopCryptos,
      );
      if (isSuccess instanceof HttpErrorResponseModel) return;
    };
  }
}
