let x = 0;
let z = 0;
labelCancelLoops: while (true) {
  console.log("Outer loops:", x);
  x += 1;
  z = 1;
  while (true) {
    console.log("Inner loops:", z);
    z += 1;
    if (z === 10 && x === 10) {
      console.log("break label");
      break labelCancelLoops; //if we do not provide lable along with break then these break will only come out of inner loop not outer loop and outer loop will run infinte so if you are using break for one loop that is fine if using in nested loop then use label to come out of fully
    } else if (z === 10) {
      break;
    }
  }
}
