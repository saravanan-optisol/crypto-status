export default class Session {
  static default_key = "default";
  static createSession(key, object) {
    key = key ? key : Session.default_key;
    object = object ? object : {};
    localStorage.setItem(key, JSON.stringify(object));
  }
  static getSession(key) {
    if (!key) {
      return {};
    }
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : {};
  }
}
