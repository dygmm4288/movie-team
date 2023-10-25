function validate(predi) {
  return (str) => {
    return predi(str);
  };
}
// 비어있으면 안되고
//
function empty(s) {
  return s !== '';
}
function atLeastLengt(s) {
  return s.length > 8;
}
function maximumLength(s) {
  return s.length <= 30;
}
function isSlang(s) {
  return true;
}
function every(arr) {
  return (s) => arr.every((func) => func(s));
}

export const validateBasic = validate(every([empty]));
export const validatePassword = validate(
  every([empty, atLeastLengt, maximumLength]),
);
export const validateComment = validate(every([empty, isSlang]));
