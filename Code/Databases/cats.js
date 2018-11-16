const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });
var Schema = mongoose.Schema;

var catSchema = new Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// // Add a new cat to the database
// var gato = new Cat({
//   name: "Mr.Satan",
//   age: 100,
//   temperament: "Evil"
// });
//
// gato.save(function(err, cat){
//   if(err) {
//     console.log("Something went wrong!");
//   } else {
//     console.log("New cat saved to the database: " + cat);
//   }
// });

// The equivalent to new and save
Cat.create({
  name: "Morpheys",
  age: 11,
  temperament: "Misterious"
}, function(err, cat){
  if(err){
    console.log(err);
  } else {
    console.log("Cat created successfully: " + cat);
  }
});

//  retrive all cats from the database using console.log()
Cat.find({}, function(err, cats){
  if(err){
    console.log("OH NO, AN ERROR!");
    console.log(err);
  } else {
    console.log("ALL THE CATS:\n" + cats);
  }
});
