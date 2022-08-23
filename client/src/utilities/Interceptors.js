import axios from "axios";

class Interceptors {
  static saveToken({
    access_token: accessToken,
    refresh_token: refreshToken,
    ...data
  }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  static requestInterceptors(data) {
    axios.interceptors.request.use(
      config => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          accessToken = JSON.parse(accessToken);
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
  }
}
export default Interceptors;
