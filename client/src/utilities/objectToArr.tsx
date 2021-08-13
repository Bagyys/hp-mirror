export const toArray = (object: object) => {
  let newArr = [];
  for (let [key, value] of Object.entries(object)) {
    newArr.push({
      id: key,
      config: value,
    });
  }
  return newArr;
};
