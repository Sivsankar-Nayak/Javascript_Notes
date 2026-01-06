const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
let a = [];
for (let i of matrix) {
  for (let j of i) {
    a.push(j);
  }
}
console.log(a);
