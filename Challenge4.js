/**Create a function getVIPCustomers(orders).

Use a loop to go through the orders.

If the price is greater than 100, add the name of the customer to a new array called vips.

If the customer name is "Anonymous", skip them (even if they spent more than 100).

Return the vips array. */
const orders = [
  { name: "Alice", price: 120 },
  { name: "Anonymous", price: 150 },
  { name: "Bob", price: 80 },
  { name: "Charlie", price: 200 },
];

// Your code here...
// Expected output: ["Alice", "Charlie"]

function getVIPCustomers(orders) {
  let vips = [];
  for (let key of orders) {
    if (key.name !== "Anonymous" && key.price > 100) {
      vips.push(key.name);
    }
  }
  return vips;
}

const vips = getVIPCustomers(orders);
console.log(vips);

/**
 * Excellent work! Your logic is 100% correct and the code is very readable. Using for...of to iterate through the array of objects is the perfect choice here.

Senior Review: Performance & Readability
You used a "positive" condition (if name is not X AND price is > Y). In complex codebases, senior developers often use "Guard Clauses" to clear out invalid data first. It makes the "main" logic stand out more.

Here is a comparison of your style versus a "Guard Clause" style:

JavaScript

// Your Style (Conditional Logic)
if (key.name !== "Anonymous" && key.price > 100) {
  vips.push(key.name);
}

// Guard Clause Style (Clear the "bad" data first)
for (let order of orders) {
  if (order.name === "Anonymous") continue; // Skip immediately
  if (order.price <= 100) continue;         // Skip immediately
  
  vips.push(order.name); // If we reached here, they are a VIP!
}
 */
