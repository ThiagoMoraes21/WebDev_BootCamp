/*
    Function that takes a single numeric argument
    and returns true if the number is even, and false otherwise
*/

//function isEven (num){
//    if(num % 2 === 0) {
//      return true;
//    } else {
//      return false;
//    }
//}

// Much shorter code
function isEven(num){
	return num % 2 === 0;
}

while(n !== 0){
  var n = Number(prompt("Write some number to know if it's a Even or Odd number"));
  var result = isEven(n);
  console.log(result);
}
