var colors = ["red", "yellow", "orange"];

// Creating a forEach function
function myForEach(arr, func) {
  //  loop through array
  for(var i = 0; i < arr.length; i++) {
    //  Call function for each item in the array
    func(arr[i]);
  }
}

myForEach(colors, function(color){
  console.log(color);
});

// Creating a forEach Object
Array.prototype.myOtherForEach = function(func){
  for(var i = 0; i < this.length; i++){
    func(this[i]);
  }
}

console.log("***************\nOther function\n***************");
colors.myOtherForEach(function(el){
  console.log(el);
});
