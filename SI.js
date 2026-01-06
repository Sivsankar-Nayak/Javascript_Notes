function simpleInterestCalculator(p, i, t) {
  return (p * i * t) / 100;
}

const interest = simpleInterestCalculator(1000, 12, 1);
console.log(
  "Simple interest of 1000rs in 1 year at 12% rate of interest is :- ",
  interest
);

