var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var reset = document.getElementById('reset');

var p1Display = document.getElementById('p1Display');
var p2Display = document.getElementById('p2Display');
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var numInput = document.querySelector('input');
var winner = 0;
var maxScore = document.getElementById('maxScore');
var setMaxScore = document.getElementById('setMaxScore');
var winningScore = 0;

// Set maxScore number
checksMaxNum();

p1.addEventListener("click", function(){
  if(!gameOver){
    p1Score++;
    if(p1Score === winningScore){
      winner = 1;
      gameOver = true;
      someoneWinned(winner);
    }
    p1Display.textContent = p1Score;
  }
});

p2.addEventListener("click", function(){
  if(!gameOver){
    p2Score++;
    if(p2Score === winningScore){
      winner = 2;
      gameOver = true;
      someoneWinned(winner);
    }
    p2Display.textContent = p2Score;
  }
});

reset.addEventListener("click", function(){
  resetNum();
});

numInput.addEventListener("change", function(){
  checksMaxNum();
  resetNum();
});

function resetNum(){
  p1Score = 0;
  p2Score = 0;
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;
  gameOver = false;
  winner = 0;
}

function checksMaxNum(){
  if(winningScore === 0){
    winningScore = 5;
  } else {
    winningScore = Number(numInput.value);
    maxScore.textContent = winningScore;
  }
}

function someoneWinned(someWinner){
  if(someWinner === 1){
    alert("Player 1 is the Winner!");
    resetNum();
  } else {
    alert("Player 2 is the Winner!");
    resetNum();
  }
}
