export const isDefined = (value: unknown): boolean => {
  return value !== null && value !== undefined;
}

export const isUndefined = (value: unknown): boolean => {
  return value === null || value === undefined;
}

export const isString = (value: unknown): boolean => {
  return value instanceof String && typeof value === 'string';
}

export const isNumber = (value: unknown): boolean => {
  return value instanceof Number && typeof value === 'number' && !isNaN(value);
}

export const isBool = (value: unknown): boolean => {
  return value instanceof Boolean && typeof value === 'boolean';
}

export const isRegex = (value: unknown): boolean => {
  return value instanceof RegExp;
}

// export const isArray = (value: unknown): boolean => {
//   return Array.isArray(value);
// };

export const isObject = (value: unknown): boolean => {
  return !Array.isArray(value) && typeof value === 'object';
}