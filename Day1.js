/**The Challenge: "The Smart ATM & Currency Validator"
Imagine you are building the backend logic for an ATM. The ATM needs to process a transaction based on the account type, the amount requested, and the currency code.**/

function processWithdrawal(accountType, balance, amount, currencyType) {
  let limit = 0;
  if (accountType === "Savings" && amount > 500 ) {
    console.log("Limit Exceeded");
    return;
  } else if (accountType === "Current" && amount > 2000) {
    console.log("Limit Exceeded");
    return;
  }

  if (balance < amount) {
    console.log("Insufficient Funds");
    return;
  }
  switch (currencyType) {
    case "USD":
      console.log("Processing Dollars");
      break;
    case "EUR":
      console.log("Processing Euros");
      break;
    case "GBP":
      console.log("Processing Pounds");
      break;
    default:
      console.log("Unsupported Currency");
  }
  console.log("Transaction Successful");
}

// processWithdrawal("Savings", 1000, 600, "USD");

processWithdrawal("Savings", 1000, 400, "USD");
