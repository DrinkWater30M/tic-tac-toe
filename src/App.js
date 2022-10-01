import React, { useState } from "react";
import Game from "./Game";

function App(){

    const [row, setRow] = useState('');
    const [col, setCol] = useState('');
    const [rule, setRule] = useState('');
    const [isCreateBoard, setIsCreateBoard] = useState(false);

    function handleGetRow(e){
        setIsCreateBoard(false);
        setRow(e.target.value);
    }

    function handleGetCol(e){
        setIsCreateBoard(false);
        setCol(e.target.value);
    }

    function handleGetRule(e){
        setIsCreateBoard(false);
        setRule(e.target.value);
    }
    
    function handleClickCreateBoard(){
        if(row && col && rule){
            setIsCreateBoard(true);
        }
    }
      
    return (
        <div>
            <div className="game-config">
                <label htmlFor="row">Số hàng: </label>
                <input type="number" id="row" value={row} onChange={(e) => handleGetRow(e)}/>
                <label htmlFor="col">Số cột: </label>
                <input type="number" id="col"  value={col} onChange={(e) => handleGetCol(e)}/>
                <label htmlFor="rule">Số kí tự liên tiếp để Win: </label>
                <input type="number" id="rule" value={rule} onChange={(e) => handleGetRule(e)}/>
                <button onClick={() => handleClickCreateBoard()}>Tạo bàn cờ</button>
            </div>
            {isCreateBoard ? <Game col={col} row={row} rule={rule}/> : <div></div>}
        </div>
    )
}

export default App;