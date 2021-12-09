export const SetItem = (item, data) => {
  localStorage.setItem(item, data);
}

export const GetItem = (item) => {
  return localStorage.getItem(item);
}

export const DeleteItem = (item) => {
  localStorage.removeItem(item);
}