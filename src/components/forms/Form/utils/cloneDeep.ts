const cloneDeep = (val: unknown) => {
  if (Array.isArray(val)) {
    return cloneArrayDeep(val);
  } else if (typeof val === 'object' && val !== null) {
    return cloneObjectDeep(val);
  }
  return val;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cloneObjectDeep = (val: any) => {
  if (Object.getPrototypeOf(val) === Object.prototype) {
    const res: Record<string, unknown> = {};
    for (const key in val) {
      res[key] = cloneDeep(val[key]);
    }
    return res;
  }
  return val;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cloneArrayDeep: any = (val: unknown[]) => {
  return val.map((item: unknown) => cloneDeep(item));
};

export default cloneDeep;
