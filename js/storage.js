export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
/* export function setStorage(key, value, options) {
  if (!getStorage(key) && options?.defaultValue) {
    setStorage(key, options.defaultValue);
  } else if (!options?.defaultValue) {
    console.error('set Storage 함수 잘못 사용하셨습니다.');
    return null;
  }
  const prev = getStorage(key);
  localStorage.setItem(key, options?.next(prev, value) || value);
  return { [key]: value };
} */
export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return { [key]: value };
}
