export function setLocalStorage (key, value) {
  const item = JSON.stringify(value || {});

  localStorage.setItem(key, item);
}

export function getLocalStorage (key) {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : {};
}