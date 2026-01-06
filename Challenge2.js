const engineering = {
  Alice: 90000,
  Bob: 85000,
  Charlie: 110000,
};

function sumAllSalaries(engineering) {
  let total = 0;
  for (let key in engineering) {
    total += engineering[key];
  }
  return total;
}

const total = sumAllSalaries(engineering);
console.log(`Sum of all salries is ${total}`);

// for in loop
/**
 * for..in

Iterates: Keys / property names

Use for: Objects

Avoid for: Arrays

for (const key in obj) {
  console.log(key, obj[key]);
}

⚠️ Includes enumerable prototype properties
 */
