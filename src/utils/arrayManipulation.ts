/**Insert data obj in the array using an ascending order algorithm */
export const insertAndSort = (array, obj) => {
  let arr = [...array];
  let insertIndex = 0;
  let newTS = obj.timestamp;
  for (let k = 0; k < arr.length; k++) {
    if (newTS > arr[k].timestamp) {
      insertIndex = k + 1;
    } else {
      break;
    }
  }

  arr.splice(insertIndex, 0, obj);

  return arr;
};
