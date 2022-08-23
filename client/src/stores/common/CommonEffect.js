import environment from "environment";
import EffectUtility from "../../utilities/EffectUtility";
import LogoutModel from "./models/LogoutModel";

export default class CommonEffect {
  static async requestLogout(payload) {
    const endpoint = environment.api.registration + "/revoke";
    return EffectUtility.putToModel(LogoutModel, endpoint, payload);
  }
}
