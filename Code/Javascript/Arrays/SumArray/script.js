var firstArray = [1, 2, 3]; //6
var secondArray = [10, 3, 10, 4]; // 27
var thirdArray = [-5, 100]; //95

function sumArray(arr){
  var sum = 0;
  arr.forEach(function(el){
    sum += el;
  });
  return sum;
}
console.log("************************\nSum of the elements\n************************");
var result = sumArray(firstArray);
console.log(result);

var result = sumArray(secondArray);
console.log(result);

var result = sumArray(thirdArray);
console.log(result);


function maxNumber(arr) {
  var max = 0;
  arr.forEach(function(el){
    if(el > max) {
      max = el;
    }
  });
  return max;
}

console.log("************************\nMax Number in the Arrays\n************************");
var result = maxNumber(firstArray);
console.log(result);

var result = maxNumber(secondArray);
console.log(result);

var result = maxNumber(thirdArray);
console.log(result);
