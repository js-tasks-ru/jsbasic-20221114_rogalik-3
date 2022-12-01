function camelize(str) {
  let arr = str.split("-");
  let newArr = arr.map(element => {
    if (element !== arr[0]) {
     return element = element[0].toUpperCase() + element.slice(1);
    } else {
      return element
    }
  })
  return newArr.join("");
}
