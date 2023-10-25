export function getStorage(key) {
  return localStorage.getItem(key);
}
export function setStorage(key, value, options) {
  if (!getStorage(key) && options.defaultValue) {
    setStorage(key, options.defaultValue);
  } else if (!options.defaultValue) {
    console.error('함수 잘못 사용하셨습니다.');
    return null;
  }
  const prev = getStorage(key);
  localStorage.setItem(key, options.next(prev, value));
  return { [key]: value };
}
