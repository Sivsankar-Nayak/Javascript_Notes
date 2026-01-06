const inventory = ["Apple", "Orange", "kiwi", "Grapes"];

function findProduct(inventory, target) {
  let index = 0;
  if (target === "Forbidden") return "Search Blocked";
  else {
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i] === target) {
        index = i;
      }
    }
    return index;
  }
}

console.log(findProduct(inventory, "Grapes"));
console.log(findProduct(inventory, "Forbidden"));
