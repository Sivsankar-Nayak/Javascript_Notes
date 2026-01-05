const products = [
  { name: "Laptop", price: 65000 },
  { name: "Phone", price: 25000 },
  { name: "Headphones", price: 2000 },
  { name: "Keyboard", price: 1500 },
  { name: "Mouse", price: 800 },
  { name: "Monitor", price: 12000 },
  { name: "Tablet", price: 30000 },
  { name: "Smartwatch", price: 8000 },
  { name: "Speaker", price: 3500 },
  { name: "Camera", price: 45000 },
];

/**  filter()

  Definition: Creates a new array with only the elements that pass a test (return true from callback).
  Does not modify the original array.
  syntax:-
    array.filter(callback(currentValue, index, array))

  */
const filteredItems = products.filter((item) => {
  return item.price > 10000;
});

// console.log(filteredItems);

/** map()
Definition: Creates a new array by applying a function to each element of the original array.
Does not modify the original array.
syntax:-
    array.map(callback(currentValue, index, array))
 */
const nameList = products.map((item) => {
  return item.name;
});
// console.log(nameList);

/** find()
 * Definition: Returns the first element that satisfies the test function.
Returns undefined if no element matches.
Syntax:-
    array.find(callback(currentValue, index, array))

 */

const phone = products.find((item) => {
  return item.name === "Phone";
});
// console.log(phone);

/** forEach
 * Definition: Executes a provided function once for each element in the array.        
   Does not return anything (returns undefined).
 */
const names = products.forEach((item) => {
  return item.name;
});

console.log(names); // returns undefined
products.forEach((item) => {
  // forEach is used this way
  // console.log(
  //   `10% discounted price on ${item.name} :- ${item.price - item.price * 0.1}`
  // );
});

/** reduce()
 * Definition: Executes a reducer function on each element, resulting in a single output value (like sum, average, object, etc.).
 * Syntax:-
 array.reduce(callback(accumulator, currentValue, index, array), initialValue)

 */
//Example :Total price of all products

const total = products.reduce((sum, item) => sum + item.price, 0);

console.log(total);

//some
/**
 * Definition: Checks if at least one element satisfies the test.
 * Returns true/false.
 * Syntax:- array.every(callback(currentValue, index, array))
 */
const hasCheap = products.some((item) => item.price < 5000);
console.log(hasCheap);

//every
/**
 * Definition: Checks if all elements satisfy the test.
 * Returns true/false.
 * Syntax:-array.every(callback(currentValue, index, array))
 */
const allExpensive = products.every((item) => item.price > 500);
console.log(allExpensive);

//sort
/**
 * Definition: Sorts the elements in place (modifies original array).
 * Default sort is alphabetical (as strings).
 * For numbers, supply a compare function.
 * Syntax:- array.sort((a, b) => a - b) // ascending numbers

 */
products.sort((a, b) => a.price - b.price);
console.log(products);

//splice()
/**
 * Definition: Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * Syntax
 */
//Example: Remove 1 product at index 2 and add a new one
products.splice(2, 1, { name: "Charger", price: 500 });
console.log(products);

const firstThree = products.slice(0, 3);
console.log(firstThree);
