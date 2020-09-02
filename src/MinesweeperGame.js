import React, { useState, useEffect, useCallback } from 'react';
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";
function App() {
  const [boardState, setBoardState] = useState({
    status: 'waiting', //waiting, running, ended
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    openCells: 0
  });
  const checkForWinner = useCallback(() => {
    if (boardState.mines + boardState.openCells >= boardState.rows * boardState.columns) {
      setBoardState({
        ...boardState,
        status: "winner"
      })
    }
  }, [boardState]);

  useEffect(() => {
    if(boardState.status === 'running'){
      checkForWinner();
    }
  }, [boardState, checkForWinner]);

  const handleCellClick = useCallback(() => {
    //if open cells are 0 and game has not started, upadate the game status
    if(boardState.openCells === 0 && boardState.status !== 'running'){
      setBoardState({
        ...boardState,
        status: 'running'
      }
      )
    }
    //increment open cells count by one everytime this function is called.
    setBoardState(prev => {
      return { ...boardState, openCells: prev.openCells + 1, status: 'running' };
    });
  });
  const reset = () => {
    //reset to initial state and change game staus back to waiting.
    setBoardState({
      ...boardState,
      status: 'waiting', //waiting, running, ended
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      openCells: 0
    });
  };

  //changes game status to ended
  const endGame = () => {
    setBoardState({
      ...boardState,
      status: "ended"
    });
  };

  //keep tracks of number of flags opened and updates depending on passed argument.
  const changeFlagAmount = amount => {
    setBoardState({ ...boardState, flags: boardState.flags + amount});
  };
  
  return (
    <div className="minesweeper">
      <h1>Minesweeper</h1>
        <BoardHead flagCount={boardState.flags} reset={reset} status={boardState.status}></BoardHead>
        <Board rows={boardState.rows} columns={boardState.columns} mines={boardState.mines} status={boardState.status} openCells={boardState.openCells} openCellClick={handleCellClick} endGame={endGame} changeFlagAmount={changeFlagAmount}/>
    </div>
  );
}

export default App;
