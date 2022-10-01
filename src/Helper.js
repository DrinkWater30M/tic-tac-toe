export function getPosition(i, row, col){
    const xPos = i%col;
    const yPos = parseInt(i/col);
  
    return [xPos, yPos];
  }
  
export function calculateWinner(squares, currentPos, row, col, rule) {
    row = parseInt(row); col = parseInt(col); rule = parseInt(rule);
    //
    const xStart = currentPos ? (currentPos[0] - rule + 1 >= 0 ? currentPos[0] - rule + 1 : 0) : null;
    const xEnd = currentPos ? (currentPos[0] + rule - 1 <= col - 1 ? currentPos[0] : col - rule) : null;
    const yStart = currentPos ? (currentPos[1] - rule + 1 >= 0 ? currentPos[1] - rule + 1 : 0) : null;
    const yEnd = currentPos ? (currentPos[1] + rule - 1 <= row - 1 ? currentPos[1] : row - rule) : null;
  
    //Quet cac vi tri co the chien thang vao mang
    let listWinPos = [];
  
    //theo hang ngang
    if(currentPos){
      for (let i = xStart; i <= xEnd; i++){
        let winPos = [];
        for(let j = 0; j < rule; j++){
          winPos.push(currentPos[1]*row + i + j);
        }
        listWinPos.push(winPos);
      }
  
      //theo hang doc
      for (let i = yStart; i <= yEnd; i++){
        let winPos = [];
        for(let j = 0; j < rule; j++){
          winPos.push(i*col + currentPos[0] + j*col);
        }
        listWinPos.push(winPos);
      }
  
      //theo hang cheo qua trai
      const gapTop = currentPos[0] - xStart <= currentPos[1] - yStart ? currentPos[0] - xStart : currentPos[1] - yStart;
      const gapBottom = currentPos[0] - xEnd <= currentPos[1] - yEnd ? currentPos[1] - yEnd : currentPos[0] - xEnd;
      const pointStart = [currentPos[0] - gapTop, currentPos[1] - gapTop];
      const pointEnd = [currentPos[0] - gapBottom, currentPos[1] + gapBottom];
      for (let i = pointStart[0]; i <= pointEnd[0]; i++){
        let winPos = []
        for(let j = 0; j < rule; j++){
          //x: i + j, y: i + j + (currentPos[1] - currentPos[0])
          winPos.push((i + j  + (currentPos[1] - currentPos[0]))*col + i + j);
        }
        listWinPos.push(winPos);
      }
      //theo hang cheo qua phai
      const gapTop2 = 
        currentPos[0] - xStart <= yEnd + rule - 1 - currentPos[1] 
          ? currentPos[0] - xStart 
          : yEnd + rule - 1 - currentPos[1];
      const gapBottom2 = 
        xEnd + rule - 1 - currentPos[0] <= currentPos[1] - yStart 
          ?  xEnd + rule - 1 - currentPos[0] 
          : currentPos[1] - yStart;
      const pointStart2 = [currentPos[0] - gapTop2, currentPos[1] + gapTop2];
      const pointEnd2 = [currentPos[0] + gapBottom2 - rule + 1, currentPos[1] - gapBottom2 + rule - 1];
      for (let i = pointStart2[0]; i <= pointEnd2[0]; i++){
        let winPos = []
        for(let j = 0; j < rule; j++){
          //x: i + j, y: (currentPos[0] + currentPos[1]) - i - j)
          winPos.push(((currentPos[0] + currentPos[1]) - i - j )*col + i + j);
        }
        listWinPos.push(winPos);
      }
      
      //kiem tra chien thang
      const player = squares[currentPos[1]*col + currentPos[0]];
      for (let i = 0; i <  listWinPos.length; i++){
        let isWin = true;
        for(let j = 0; j < rule; j++){
          if(squares[listWinPos[i][j]] !== player){
            isWin = false;
            break;
          }
        }
        
        if(isWin){
          return {winner: player, winPos: listWinPos[i]}
        }
      }
    }
    return {winner:null, winPos:null};
}
  
  