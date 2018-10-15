// Print out 10 random fake product names and fake prices

var faker = require('faker');

console.log("**********************************");
console.log("\nWELCOME TO MY SHOP\n");
console.log("**********************************");

for(var i = 0; i < 10; i++){
    var productName = faker.commerce.productName(); 
    var randomPrice = faker.commerce.price(); 
    console.log(productName + " - " + randomPrice);
}


