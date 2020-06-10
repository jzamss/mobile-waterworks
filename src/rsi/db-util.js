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

export const serializeJson = (value) => {
  if (!value) return null;
  return JSON.stringify(value);
}

export const deserializeJson = (value) => {
  if (!value) return null;
  return JSON.parse(value);
}

export const serializeBoolean = (value) => {
  return value ? 1 : 0;
}

export const deserializeBoolean = (value) => {
  return value === 1;
}


const isDate = (value) => {
  return typeof value.getMonth === "function";
};
