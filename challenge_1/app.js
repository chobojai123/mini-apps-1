var cells = document.getElementsByClassName('cell');

// add click event listener to each cell

for(var i = 0; i < cells.length; i ++){
  cells[i].addEventListener('click', addMark)
}

// vars to store X and O results
// var for counter starting at 1, even counter = O; odd counter = X;
var turnCounter = 1
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

//add main function to add X or O after clicked
function addMark(event){
  if(event.
}
















function cellClick(cell) {
  if (cell.id === "cell1x1") {
    document.getElementById("cell1x1").innerHTML = "X";
    document.getElementById("cell1x1").innerHTML = nextTurn;
    playerTurn();
  } else if (cell.id === "cell1x2"){
    document.getElementById("cell1x2").innerHTML = "X";
    document.getElementById("cell1x2").innerHTML = nextTurn;
    playerTurn();    
  }
}


function playerTurn() {
  if (nextTurn === 'X') {
    nextTurn = 'O';
  } else {
    nextTurn = 'X';
  }
}


console.log('hi');
console.log("DOM fully loaded and parsed");