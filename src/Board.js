import React from "react";
import Square from "./Square";

function Board(props){
    function renderSquare(i) {
      const winPos = props.winPos;
      return (
        <Square 
          isFill={winPos && winPos.includes(i) ? true : false}
          value={props.squares[i]}
          onClick={() => {props.onClick(i);}}/>
      ); 
    }
  
    function renderBoard(row, col){
      let rows = [];
      for (let i = 0 ; i < row; i++){
        let squares = [];
        for (let j = 0; j < col; j++){
          squares.push(renderSquare(i*col + j));
        }
        
        const row = <div className="board-row">{squares}</div>;
        rows.push(row);
      }
  
      return <div>{rows}</div>;
    }
  
    return renderBoard(props.row, props.col);
}

export default Board;