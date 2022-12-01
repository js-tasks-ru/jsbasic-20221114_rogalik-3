function getMinMax(str) {
  let arr = str.split(" ").filter(element => isFinite(element));
  let minMaxArray = arr.map(element => Number(element)).sort((a, b) => a - b);
  return {
    min: minMaxArray.at(0),
    max: minMaxArray.at(-1)
  };
}
