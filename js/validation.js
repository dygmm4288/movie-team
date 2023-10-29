import { slangs } from './slang.js';
function validate(predi) {
  return (str) => {
    return predi(str);
  };
}

function empty(s) {
  return s !== '' || s === undefined || s === null;
}
function atLeastLengt(s) {
  return s.length >= 8;
}
function maximumLength(s) {
  return s.length <= 30;
}
function isSlang(s) {
  // isSlang(s)가 True여야 됨
  // s가 입력으로 들어올 때 slangs에 모든 원소들과 비교햇을 때 같은 내용이 없으면 true
  return slangs.every((slang) => !s.includes(slang));
}
function every(arr) {
  return (s) => arr.every((func) => func(s));
}

export const validateBasic = validate(every([empty]));
export const validatePassword = validate(
  every([empty, atLeastLengt, maximumLength]),
);
export const validateComment = validate(every([empty, isSlang]));
