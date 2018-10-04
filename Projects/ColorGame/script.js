var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function(){
  // generate all new colors
  colors = generateRandomColors(6);
  // pick a new random color from the array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // change the colors of squares
  for(var i = 0; i < squares.length; i ++){
    squares[i].style.backgroundColor = colors[i];
  }
  // reset the h1 backgroundColor
  h1.style.backgroundColor = "#232323";
  // reset the message
  messageDisplay.textContent = "";
  // reset the btn text content
  resetBtn.textContent = "New Colors";
});

colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++) {
  // add initial colors to squares
  squares[i].style.backgroundColor = colors[i];
  // add click listener to squares
  squares[i].addEventListener("click", function(){

  // grab color of clicked squares
  var clickedColor = this.style.backgroundColor;
  // compare color to pickedColor
  if(clickedColor === pickedColor) {
    messageDisplay.textContent = "Correct!";
    changeColors(clickedColor);
    h1.style.backgroundColor = clickedColor;
    resetBtn.textContent = "Play Again?";
  } else {
    messageDisplay.textContent = "Try Again!";
    this.style.backgroundColor = "#232323";
  }
  });
}

function changeColors(color) {
  // loop through all elements
  for(var j = 0; j < squares.length; j++) {
    // change each color to match given colors
    squares[j].style.backgroundColor = color;
  }
}

function pickColor(){
  var random =  Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  // make a array
  var arr = [];
  // repeat num times
  for(var i = 0; i < num; i++){
    // get random color and push into array
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor(){
  // pick a "red" from 0-255
  var r = Math.floor(Math.random() * 256);
  // pick a "green" from 0-255
  var g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0-255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
