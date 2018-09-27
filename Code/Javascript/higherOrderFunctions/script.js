// Returns a function that recives a value as parementer
// and return this value multiplier by the factor
function multiplier(factor) {
  return function(x) {
    return x * factor;
  }
}

var doubler = multiplier(2);
var tripler = multiplier(3);

console.log(doubler(4));
console.log(tripler(4));

// Does the same thing that the function above
// But instead uses a Arrow function
function mult(factor) {
  return x => x * factor;
}

var doubler = mult(2);
var tripler = mult(3);

console.log("**************\nArrow function\n**************");
console.log(doubler(4));
console.log(tripler(4));


// It's the equivalent of
// (x) => {
//   return x * factor;
// }

// But when you only have one argument been recived
// you don't need the parenteses (x) => ---> x =>

// If the function takes more then One parameter
// you have to use the parenteses.
// (x, y) => return x * y;

// And when the function only have One line, you don't
// need the {}

// And when the function don't have the {}, will be
// presumed that it uses the Return key word

// So you end up with this: return x => x * factor
