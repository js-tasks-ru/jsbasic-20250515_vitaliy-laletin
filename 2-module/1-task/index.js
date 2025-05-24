function sumSalary(salaries) {
  let sum = 0;

  for (let prop in salaries) {
    if (typeof salaries[prop] !== "number") continue;

    sum += isFinite(salaries[prop]) ? salaries[prop] : 0;
  }

  return sum;
}
