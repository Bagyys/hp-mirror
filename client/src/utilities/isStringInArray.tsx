export const isStringInArray = (id: string, arr: Array<string>) => {
  return arr.some((item) => item === id);
};
