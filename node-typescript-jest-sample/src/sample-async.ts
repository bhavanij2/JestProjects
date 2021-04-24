export const fetchData = async () => Promise.resolve("apple");

export const fetchDataWithError = () =>
  Promise.reject(new Error("Fetch Error"));
