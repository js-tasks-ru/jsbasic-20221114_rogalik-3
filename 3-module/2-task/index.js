function filterRange(arr, a, b) {
  let cloneOfArr = arr.slice();
  for (let i = 0; i < cloneOfArr.length; i++) {
    if (cloneOfArr[i] < a || cloneOfArr[i] > b) {
      cloneOfArr.splice(i, 1);
    }
  }
  return cloneOfArr;
}
