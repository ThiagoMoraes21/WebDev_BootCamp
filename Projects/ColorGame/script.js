var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init(){
  setupModeBtns();
  setupSquares();
  resetGame();
}

function setupSquares(){
  for(var i = 0; i < squares.length; i++) {
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
        this.style.cursor = "default";
      }
    });
  }
}

function setupModeBtns(){
  // mode buttons event listeners
  for(var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function(){
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      resetGame();
    });
  }
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

resetBtn.addEventListener("click", function(){
  resetGame();
});

function resetGame(){
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from the array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // change the colors of squares
  for(var i = 0; i < squares.length; i ++){
    if(colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
      squares[i].style.cursor = "pointer";
    } else {
      squares[i].style.display = "none";
    }
  }
  // reset the h1 backgroundColor
  h1.style.backgroundColor = "#287c7a";
  // reset the message
  messageDisplay.textContent = "";
  // reset the btn text content
  resetBtn.textContent = "New Colors";
  //
}
