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
    if(boardState.openCells === 0 && boardState.status !== 'running'){
      setBoardState({
        ...boardState,
        status: 'running'
      }
      )
    }
    setBoardState(prev => {
      return { ...boardState, openCells: prev.openCells + 1, status: 'running' };
    });
  });
  const reset = useCallback(() => {
    setBoardState({
      ...boardState,
      status: 'waiting', //waiting, running, ended
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      openCells: 0
    });
  },[setBoardState]);

  const endGame = useCallback(() => {
    setBoardState({
      ...boardState,
      status: "ended"
    });
  }, [boardState]);

  const changeFlagAmount = useCallback(amount => {
    setBoardState({ ...boardState, flags: boardState.flags + amount});
  }, [boardState]);
  
  return (
    <div className="minesweeper">
      <h1>Minesweeper</h1>
        <BoardHead flagCount={boardState.flags} reset={reset} status={boardState.status}></BoardHead>
        <Board rows={boardState.rows} columns={boardState.columns} mines={boardState.mines} status={boardState.status} openCells={boardState.openCells} openCellClick={handleCellClick} endGame={endGame} changeFlagAmount={changeFlagAmount}/>
    </div>
  );
}

export default App;
