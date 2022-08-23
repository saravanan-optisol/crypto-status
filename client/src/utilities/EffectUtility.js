import HttpErrorResponseModel from "../models/HttpErrorResponseModel";
import HttpUtility from "./HttpUtility";

export default class EffectUtility {
  static async getToModel(Model, endpoint, params, headers = null) {
    const response = await HttpUtility.get(endpoint, params, headers);

    return EffectUtility._restModelCreator(Model, response, endpoint);
  }
  static async getToModelHeader(Model, endpoint, headerType = null) {
    const response = await HttpUtility.getWithHeader(endpoint, headerType);
    return EffectUtility._restModelCreator(Model, response, endpoint);
  }

  static async postToModel(Model, endpoint, data, headers = null) {
    const response = await HttpUtility.post(endpoint, data, headers);
    return EffectUtility._restModelCreator(Model, response, endpoint);
  }

  static async putToModel(Model, endpoint, data, headers = null) {
    const response = await HttpUtility.put(endpoint, data, headers);
    return EffectUtility._restModelCreator(Model, response, endpoint);
  }

  static async delToModel(Model, endpoint, data, headers = null) {
    const response = await HttpUtility.delete(endpoint, data, headers);
    return EffectUtility._restModelCreator(Model, response, endpoint);
  }

  static _restModelCreator(Model, response, endpoint) {
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }
    /* return !Array.isArray(response.data)
      ? new Model(response.data, endpoint)
      : response.data.map(json => new Model(json, endpoint)); */
    return new Model(response.data, endpoint);
  }
}
