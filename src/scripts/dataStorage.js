export const storageObj = {
  mainTimer: {},
  delayTimer: {},
  counter: {},
};

export const saveToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadLocalStorage = function (key, storage) {
  const timerStorageUpdate = localStorage.getItem(key);
  storage.value = JSON.parse(timerStorageUpdate);
};

export const resetLocalStorage = function (key) {
  localStorage.removeItem(key);
};
