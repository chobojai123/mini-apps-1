var cells = document.getElementsByClassName('cell');
var score = document.getElementsByClassName('P1-score');
// add click event listener to each cell

for(var i = 0; i < cells.length; i ++){
  cells[i].addEventListener('click', addMark)
}


// vars to store X and O results
// var for counter starting at 1, even counter = O; odd counter = X;
var playerX = 0;
var playerO = 0;
var currentPlayer = 1;
var turnCount = 1;
var resultX = [];
var resultO = [];
// var to store all possible combos
var possibleCombo = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9] 
        ];


//  add main function to add X or O after clicked
function addMark(event){
  if(event.target.innerHTML.length === 0){
    // even counter = O; odd counter = X, if statement to tell which to mark
    if(turnCount % 2 === 0){
      resultO.push(Number(event.target.id));
      event.target.innerHTML = 'O';
      currentPlayer--;
    } else {
      resultX.push(Number(event.target.id))
      event.target.innerHTML = 'X'
      currentPlayer++;
    }
  } else {
    alert('This box has already been clicked!');
  }
  // increment counter every turn to keep track
  turnCount++;
  // function check for winners here
  findWinner(resultX, 'X');
  findWinner(resultO, 'O');
  // if it reaches 10, alert no winner!
  if(turnCount === 10){
    alert('There is no winner and it is a tie game!');
  }
}

// helper function to check for winner
function findWinner(resultArray, marked){
  // iterate through the 8 possible combos
  for(var i = 0; i < possibleCombo.length; i ++){
  // var to keep track of matching numbers
    var countWins = 0;
    //  iterate through length of each possible outcome
    for(var j = 0; j < possibleCombo[i].length; j ++){
      if(resultArray.indexOf(possibleCombo[i][j]) !== -1){
        //  if there is matching #, increase countWin
        countWins++;
      } 
      // if there is 3 matching #, announce winner
      if(countWins === 3 && marked === 'X'){
        playerX++;   
        alert('The winner of this game is ' + marked + '!');
        score.innerHTML = 2;
        score.innerTEXT = 2;
        stopGame();
        // }
      } else if (countWins === 3 && marked === 'O'){
        playerO++;
        alert('The winner of this game is ' + marked + '!');
        stopGame();
      }
    }
  }
}

function stopGame(){
  for(var i = 0; i < cells.length; i++){
    cells[i].removeEventListener('click', addMark);
  }
}

// function for reloading game
function startNewGame(number){
  for(var i = 0; i < cells.length; i++){
    turnCount = 1;
    currentPlayer = 1;
    resultX = [];
    resultO = [];
    cells[i].innerHTML = '';
    cells[i].addEventListener('click', addMark);
  }
}
  