// const a = [4, 1, 2, 4];
// let highvalue=Math.max(...a);
// let count=0;
// for(let i=0;i<a.length;i++){
//     if(a[i]===highvalue){
//         count++
//     }
// }

const months = ["Jan", "March", "April", "June"];
const newm = months.slice(1, 3);
console.log(newm);
months.splice(1, 0, "Feb");
console.log(months);
