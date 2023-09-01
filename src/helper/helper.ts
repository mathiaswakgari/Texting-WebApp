export const startsWithHelper = (text: string) => {
  var strlength = text.length;
  var strFrontCode = text.slice(0, strlength - 1);
  var strEndCode = text.slice(strlength - 1, text.length);
  var endcode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  return endcode;
};
