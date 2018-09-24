function capitalize(str) {
  if(typeof str === "number") {
    return "that's not a string!"
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var city = "paris";              //"paris"
var capital = capitalize(city);  //"Paris"
console.log(capital);

var num = 37;
var capital = capitalize(num);  //"that's not a string!"
console.log(capital);
