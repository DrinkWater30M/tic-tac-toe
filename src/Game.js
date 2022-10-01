import React, { useState } from "react";
import Board from "./Board";
import { getPosition, calculateWinner } from "./Helper";

function Game(props) {
  const [history, setHistory] = useState(
    [
    {squares: Array(props.row*props.col).fill(null),
    currentPos: null,
    },
    ]
  )

  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [sort, setSort] = useState(false);

  function handleClick(i){
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    const newPos = getPosition(i, props.row, props.col);
    
    if (calculateWinner(squares, current.currentPos, props.row, props.col, props.rule).winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares: squares,
      currentPos: newPos, 
    }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  function handleSort(){
    setSort(!sort);
  }

  const current = history[stepNumber];
  const {winner, winPos} = 
    calculateWinner(current.squares, current.currentPos, props.row, props.col, props.rule);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + ` at (${step.currentPos[0]}, ${step.currentPos[1]})` :
      'Go to game start';
    return (
      <li key={move}>
        <button className={move===stepNumber ? 'selected' : ''} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } 
  else if(!current.squares.includes(null)){
    status = 'This match is draw!';
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  return (
    <div className="game">
      <div className="game-board">
          <Board
          winPos={winPos}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          col={props.col}
          row={props.row}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div><button onClick={() => handleSort()}>Sort by {sort ? 'Ascending' : 'Descending'}</button></div>
        <ol>{sort ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}

export default Game;