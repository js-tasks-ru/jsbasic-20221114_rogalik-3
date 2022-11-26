function checkSpam(str) {
  if (str.toUpperCase().includes("XXX")) {
    return true;
  } else if (str.toUpperCase().includes("1XBET")) {
    return true;
  } else {
    return false;
  }
}
