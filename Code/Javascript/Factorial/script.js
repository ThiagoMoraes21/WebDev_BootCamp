/*
    Function that takes a single numeric number
    and returns the factorail of that number.
*/

//  Recursive?
// function factorial(num) {
//   return (num * fuctorial(num - 1));
// }

function factorial(num) {
  for(var i = num; i > 1; i--) {
    num *= (i - 1);
  }
  if(num === 0) {
    return num + 1;
  }
  return num;
}

var n = Number(prompt("Write a number to see it's factorial"));
var result = factorial(n);
var showResult = document.getElementById('fac').innerHTML = n + "! = " + result;
