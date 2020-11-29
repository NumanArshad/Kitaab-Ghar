const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && !value.trim().length) ||
  (typeof value === "object" && !Object.entries(value).length);

export default isEmpty;
