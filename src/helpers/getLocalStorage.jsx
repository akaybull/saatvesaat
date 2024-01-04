export default function getLocalStorage(localStorageItem) {
  const storedData = localStorage.getItem(localStorageItem);
  const parsedData = storedData ? JSON.parse(storedData) : null;
  return parsedData;
}
