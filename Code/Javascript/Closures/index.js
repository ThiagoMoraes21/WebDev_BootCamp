// CLOSURES
function outer() {
  let data = 'Closures are ';
  return function inner(){
    let innerData = 'awesome';
    return  data + innerData;
  }
}

//  Returns the definition of the function inner
console.log(outer());

//  Return 'Closures are awesome'...
console.log(outer()());

//  some space
console.log('===============================');

//  EXEMPLE #02
//  The inner function is making use of the 'a' variable
//  which was defined in a outer function called otherOuter
//  and by the time this is called, that outer function has returned
//  this functino called 'inner' is a closure!

function otherOuter(a){
  return function inner(b) {
    return a + b;
  }
}

//  testing
console.log(otherOuter(5)(5)); // 10

let storeOuter = otherOuter(5);
console.log(storeOuter(10)); // 15

//  some space
console.log('===============================');

// PRIVATE VARIABLES

// No one has access to the variable 'count'
// it's a private variable, so no one can change the value
// that 'count' starts of
function counter(){
	let count = 0;
	return function(){
		return ++count;
	}
}

let c = counter();

console.log(c) // returns a function definition
// ƒ (){
// 		return ++count;
// 	}

console.log(c()); // 1
console.log(c()); // 2
console.log(c()); // 3

//  some space
console.log('===============================');

// MORE PRIVACY
function classRomm(){
	let instructors = ['Colt', 'Elie'];
	return {
		getInstructors: function(){
			return instructors;
		},
		addInstructor: function(instructor){
			instructors.push(instructor);
			return instructors;
		}
	}
}

let course1 = classRomm();
console.log(course1.getInstructors()); // ['Colt', 'Elie']
console.log(course1.addInstructor('Ian')); // ['Colt', 'Elie', 'Ian']

//  This object does not have access to the 'Ian' instructor
//  because it was created by another instance
let course2 = classRomm();
console.log(course2.getInstructors()); // ['Colt', 'Elie']
