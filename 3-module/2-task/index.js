function filterRange(arr, a, b) {
  let cloneOfArr = arr.filter((element) => {
    return element >= a && element <= b;
  });
  return cloneOfArr;
}
