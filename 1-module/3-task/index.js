function ucFirst(str) {
  if (str === "") {
    return str;
  } else {
  const firstLetter = str[0].toUpperCase();
  const otherStr = str.slice(1);
  return firstLetter + otherStr;
  }
}
