function getMinMax(str) {
  const numArray = str.split(" ").filter((num) => isFinite(+num)).map((num) => +num);

  return {
    min: Math.min(...numArray),
    max: Math.max(...numArray)
  };
}
