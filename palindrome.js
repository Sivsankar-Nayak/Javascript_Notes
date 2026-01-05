function palindrom(number) {
  let reverse = number.split("").reverse().join("");
  if (reverse === number) {
    return true;
  } else {
    return false;
  }
}

const isPalindrom = palindrom(121);
console.log(isPalindrom);
