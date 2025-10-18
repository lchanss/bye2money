export const localeStringToNumber = (str: string): number =>
  Number(str.replace(/,/g, ""));
