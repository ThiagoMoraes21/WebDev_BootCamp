/*
    Create a constructor function for a Vehicle: every object created from this
    constructor should have a make, model, and year property. Each object
    should also have a property called isRunning, which should be set to FALSE

    Every object created from the Vehicle constructor should have a function
    called turnOn, which changes the isRunning property to TRUE

    Every object created from the Vehicle constructor should have a function
    called turnOff, which changes the isRunning property to FALSE

    Every object created from the Vehicle constructor should have a method
    called honk, which returns the string 'beep' ONLY if the isRunning
    property is TRUE

*/

function Vehicle(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

Vehicle.prototype.turnOn = function(){
  return this.isRunning = true;
}

Vehicle.prototype.turnOff = function(){
  return this.isRunning = false;
}

Vehicle.prototype.honk = function(){
  if(this.isRunning){
    console.log('Beep...');
  }
}

let car = new Vehicle('dunno', 'classic', 2019);

//  Console car's honk
car.turnOn();
car.honk();

// Turn off the car
car.turnOff();
car.honk(); // nop, no sound!
