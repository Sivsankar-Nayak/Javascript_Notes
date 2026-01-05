// const list = [12, 10, 11, 19, 17];
// const listofpeople = { name: "Laim", age: 22, address: "Surat" };
// for (let item of list) {
//   console.log(item);
// }
// setTimeout(() => {
//   console.log("setTime oput after 2 sec");
// }, 3000);
// const a = setInterval(() => {
//   console.log("setInterval output after 2 sec");
// }, 3000);
// clearInterval(a);
// for (let item in listofpeople) {
//   console.log(item);
// }

// example of callback
const greet = (name) => {
  console.log(`Welcome ${name}`);
};
const higherOrderFunction = (callback) => {
  const name = "Sivsankar";
  callback(name);
};
higherOrderFunction(greet);

// example of Promise
const onFullfillment = (result) => {
  console.log(result);
  console.log("Set up the dinner Table");
};
const onRejection = (error) => {
  console.log(error);
  console.log("Cook the pasta");
};
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Got the Tacos");
  }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Did not get tacos");
  }, 3000);
});
promise.then(onFullfillment);
promise2.catch(onRejection);
