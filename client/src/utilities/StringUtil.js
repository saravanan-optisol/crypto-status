export default class StringUtil {
  static splitBySeparator = (str, separator) => {
    return str.split(new RegExp(`(.*?${separator})`, "g")).filter(Boolean);
  };

  static onlyAlphabet = str => {
    if (typeof str !== "string") return;

    const isValid = str
      .split("")
      .filter(Boolean)
      .every(s => {
        const str = s.charCodeAt(0);
        return (str > 64 && str < 91) || (str > 96 && str < 123);
      });

    return isValid;
  };

  static onlyNumbers = str => {
    if (typeof str !== "string") return;

    const isValid = str
      .split("")
      .filter(Boolean)
      .every(s => {
        const str = s.charCodeAt(0);
        return str > 47 && str < 58;
      });

    return isValid;
  };
}
