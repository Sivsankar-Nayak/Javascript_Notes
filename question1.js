const array1 = [1, 8, 2, 3, 7, 9, 5, 6];

function printedDelay(arr) {
  arr.forEach((value, index) => {
    const nextValue = arr[index + 1] || 0;
    console.log("nextvalue", nextValue);
    setTimeout(() => {
      console.log(value);
    }, nextValue * 1000);
  });
}

printedDelay(array1);
