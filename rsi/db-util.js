export const toDate = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (isDate(value)) {
    return value;
  }

  return new Date(value);
};

export const serializeDate = (value) => {
  if (!value) return null;
  return value.toString();
}

export const deserializeDate = (value) => {
  if (!value) return null;
  return new Date(value);
}



const isDate = (value) => {
  return typeof value.getMonth === "function";
};
