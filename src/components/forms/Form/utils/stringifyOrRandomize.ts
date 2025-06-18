export const stringifyOrRandomize = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    return Math.random();
  }
};
