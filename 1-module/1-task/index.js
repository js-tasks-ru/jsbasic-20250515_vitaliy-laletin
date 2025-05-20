function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = n;

  for (let i = n; i > 1; i--) {
    result *= i - 1;
  }

  return result;
}
