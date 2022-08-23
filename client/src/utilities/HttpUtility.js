import axios from "axios";
import Interceptors from "./Interceptors";
import HttpErrorResponseModel from "../models/HttpErrorResponseModel";
import { history } from "../stores/_helpers/history";

const RequestMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Options: "OPTIONS",
  Head: "HEAD",
  Patch: "PATCH"
};
// Interceptors.requestInterceptors();
// Interceptors.responseInterceptor();

export function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export function forceLogout(status) {
  if (status === 401 && history.location.pathname !== "/") {
    window.location.href = "/";
    localStorage.clear();
  }
}

export default class HttpUtility {
  static async get(endpoint, params, requestConfig) {
    const paramsConfig = params ? { params } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get
      },
      {
        ...paramsConfig,
        ...requestConfig
      }
    );
  }
  static async getWithHeader(endpoint, headerType) {
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get
      },
      {
        headerParam: headerType
      }
    );
  }

  static async post(endpoint, data, headers) {
    const config = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post
      },
      config,
      headers
    );
  }

  static async put(endpoint, data) {
    const config = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Put
      },
      config
    );
  }

  static async delete(endpoint, params) {
    const paramsConfig = params ? { params } : undefined;
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Delete
      },
      {
        ...paramsConfig
      }
    );
  }

  static async _request(restRequest, config, headers = null) {
    if (!Boolean(restRequest.url)) {
      console.error(
        `Received ${restRequest.url} which is invalid for a endpoint url`
      );
    }

    try {
      let axiosRequestConfig = {};
      let accessToken = localStorage.getItem("accessToken");
      if (config?.headerParam) {
        axiosRequestConfig = {
          method: restRequest.method,
          url: restRequest.url,
          headers: {
            Authorization:
              config.headerParam === 1
                ? "52b1b16c-fac9-4253-bfb5-c05015289b94"
                : config.headerParam === 2
                ? "e8f78924-0cb3-4b9b-8432-6e442d812ffd"
                : ""
          }
        };
      } else if (accessToken) {
        let Token = JSON.parse(accessToken);
        if (Token) {
          axiosRequestConfig = {
            ...config,
            method: restRequest.method,
            url: restRequest.url,
            headers: {
              "Content-Type": headers ? headers : "application/json",
              Authorization: "Bearer " + Token
            }
          };
        }
      } else {
        axiosRequestConfig = {
          ...config,
          method: restRequest.method,
          url: restRequest.url,
          headers: {
            "Content-Type": headers ? headers : "application/json"
          }
        };
      }
      const [axiosResponse] = await Promise.all([
        axios(axiosRequestConfig),
        HttpUtility._delay()
      ]);
      const { status, data, request } = axiosResponse;

      if (
        data.success === false ||
        data?.status > 226 ||
        data?.status?.status > 226
      ) {
        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: data.errors
              ? data?.errors.join(" - ")
              : data?.msg || data?.status?.msg,
            errors:
              data.errors || [data?.msg || data?.status?.msg].filter(Boolean),
            url: request ? request.responseURL : restRequest.url,
            raw: axiosResponse
          },
          restRequest
        );
      }

      return {
        ...axiosResponse
      };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText, data } = error.response;
        const errors = data.hasOwnProperty("error")
          ? [
              statusText,
              data.error_description || data?.status?.msg || data?.msg
            ]
          : [statusText || data?.status?.msg || data?.msg];

        forceLogout(status);

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(" - "),
            errors,
            url: error.request.responseURL,
            raw: error.response
          },
          restRequest
        );
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        const { status, statusText, responseURL } = error.request;

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request
          },
          restRequest
        );
      }

      // Something happened in setting up the request that triggered an Error
      return HttpUtility._fillInErrorWithDefaults(
        {
          status: 0,
          message: error.message,
          errors: [error.message],
          url: restRequest.url,
          raw: error
        },
        restRequest
      );
    }
  }

  static _fillInErrorWithDefaults(error, request) {
    const model = new HttpErrorResponseModel();
    let message;
    if (error.url.includes("/roofAndFloor/login")) {
      message = "Invalid credentials";
    }
    model.status = error.status || 0;
    model.message = error.message || message || "Error requesting data";
    model.errors = error.errors.length
      ? error.errors
      : ["Error requesting data"];
    model.url = error.url || request.url;
    model.raw = error.raw;

    // Remove anything with undefined or empty strings.
    model.errors = model.errors.filter(Boolean);

    return model;
  }

  /**
   * We want to show the loading indicator to the user but sometimes the api
   * request finished too quickly. This makes sure there the loading indicator is
   * visual for at least a given time.
   *
   * @param duration
   * @returns {Promise<unknown>}
   * @private
   */
  static _delay(duration = 250) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }
}
