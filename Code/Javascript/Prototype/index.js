function Person(name) {
  this.name = name;
  this.sayHi = () => console.log(`Hi ${this.name}`);
}

let elie = new Person('Elie');
elie.sayHi();

//  This code works, but it's inefficient
//  every time we make an object using the new keyword we have
//  to redefine this function (create it again)

//  But it's the same for every one! So let's put it on the
//  prototype instead...

function Person2(name){
  this.name = name;
}

Person2.prototype.sayHi = function(){
  console.log(`Hi ${this.name}`);
}

let thiago = new Person2('Thiago');
thiago.sayHi();
