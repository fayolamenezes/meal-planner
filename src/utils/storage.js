export const getData = (key, fallback = []) =>
  JSON.parse(localStorage.getItem(key)) || fallback;

export const saveData = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const clearData = (key) =>
  localStorage.removeItem(key);
