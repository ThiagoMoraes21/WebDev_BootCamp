var firstArray = [2, 3, 34, 2, 22, 45, 9];
var secondArray = [1, 1, 1, 1, 1, 1, 1, 1];
var thirdArrya = [2, 2, 2, 2, 2, 0];

//  Compare the elements of an array
//  if they're the same the function return true
//  otherwise return false
function isUniform(theArray) {
  for(var i = 0; i < theArray.length - 1; i++) {
    if(theArray[i] !== theArray[i+1])
      return false;
  }
  return true;
}

// false
var result = isUniform(firstArray);
console.log(result);
// true
var result = isUniform(secondArray);
console.log(result);
// false
var result = isUniform(thirdArrya);
console.log(result);
