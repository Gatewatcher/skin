export const removeAffixes = (
  value: string,
  affixes: { prefix?: string; suffix?: string },
) => {
  const { prefix = '', suffix = '' } = affixes;

  const withoutPrefix = prefix
    ? value.replace(new RegExp(`^${prefix}`), '')
    : value;

  return suffix ? withoutPrefix.replace(new RegExp(`${suffix}$`), '') : value;
};
