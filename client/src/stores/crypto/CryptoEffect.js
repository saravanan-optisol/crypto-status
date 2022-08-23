import environment from "environment";
import EffectUtility from "../../utilities/EffectUtility";
import CryptoModel from "./models/CryptoModel";

export default class CryptoEffect {
  static async getTopCryptos(payload) {
    const endpoint = environment.route.baseRoute + "/getTopCrypto";
    return EffectUtility.getToModel(CryptoModel, endpoint, payload);
  }
}
