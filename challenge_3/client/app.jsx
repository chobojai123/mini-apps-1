class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 1,
      player2: 2,
      board: [],
      gameState: false,
      message: '',
      currentPlayer: null
    };
    this.play = this.play.bind(this);
  }
  
  // Starts new game
  createNewBoard() {
    var board = [];
    for (var r = 0; r < 6; r++) {
      var row = [];
      for (var c = 0; c < 7; c++) { 
      row.push(null) 
    }
      board.push(row);
    }
    //set initial values when board is created
    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameState: false,
      message: ''
    });
  }
  
  // toggle function whenever clicked
  togglePlayer() {
    if(this.state.currentPlayer === this.state.player1){
      return this.state.player2;
    } else {
      return this.state.player1;
    }
    // return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }
  
  play(c) {
    if (!this.state.gameState) {
      // Place piece on board
      var board = this.state.board;
      for (var r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }

      // Check status of board
      var result = this.checkForAnyOutcome(board);
      if (result === this.state.player1) {
        this.setState({ board, gameState: true, message: 'Player 1 (red) wins!' });
      } else if (result === this.state.player2) {
        this.setState({ board, gameState: true, message: 'Player 2 (yellow) wins!' });
      } else if (result === 'draw') {
        this.setState({ board, gameState: true, message: 'Draw game.' });
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }
  
  // vertical checking function
  checkVertical(board) {
    // it has to start row 4 for first possible answer
    for (var r = 3; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        if (board[r][c]) {
          //if they are all equal, return the board
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            return board[r][c];    
          }
        }
      }
    }
  }
  // horizontal checking function
  checkHorizontal(board) {
    // the columns have to be less than 4 for a horizontal win
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalRight(board) {
    for (var r = 3; r < 6; r++) {
      for (var c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board) {
    for (var r = 3; r < 6; r++) {
      for (var c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  


  checkDraw(board) {
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'It is a draw!!';    
  }
  

  // helper function for checking any possible outcome
  checkForAnyOutcome(board) {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }
  

  // this will initialize the board creation
  componentWillMount() {
    this.createNewBoard();
  }
  
  render() {
    return (
      <div>
        <button className="button" onClick={ () => {this.createNewBoard()} }>Start New Game</button>
        <h1>Connect 4</h1>
      <div className="circles">
      </div>
      <div id="main"></div>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>
        
        <p className="message">{this.state.message}</p>
      </div>
    );
  }
}

// variables for creating the rows for the board

var Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

var Cell = ({ value, columnIndex, play }) => {
  var color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }
    
  return (
    <td>
      <div className="cell" onClick={() => {play(columnIndex)}}>
        <div className={color}></div>
      </div>
    </td>
  );
};



ReactDOM.render(<App />, document.getElementById('app'));







