import React, { useEffect, useState } from 'react';
import Row from '../Row';
export const Board = (props) => {
    //Creates empty board
    const createBoard = props => {
        let board = [];
        for(let i = 0; i < props.rows; i++){
            board.push([]);
            for(let j = 0; j < props.columns; j++){
                board[i].push({
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false
                });
            }
        }
        // After the board is created, add mines
        for(let i = 0; i < props.mines; i++){
            let randomRow = Math.floor(Math.random() * props.rows); 
            let randomCol = Math.floor(Math.random() * props.columns);
            let cell = board[randomRow][randomCol];
            //If the cell already has a mine, go back one and retry
            if(cell.hasMine){
                i--;
            }
            else{
                cell.hasMine = true;
            }
        }
        return board;
    }
    //Updates the flagged status
    const flag = cell => {
        let newRows = [...rowsState];
        cell.hasFlag = !cell.hasFlag;
        newRows[cell.y][cell.x].hasFlag = cell.hasFlag; 
        setRowsState(newRows);
        props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    };
    //Opens a closed cell.
    const open = cell => {
        let asyncCountMines = new Promise(resolve => {
            let mines = findMines(cell);
            resolve(mines);
        });
        asyncCountMines.then(noOfMines => {
            let rows = rowsState;
            let current = rows[cell.y][cell.x];
            if(current.hasMine && props.openCells === 0 ){
                let newRows = createBoard(props);
                setRowsState(newRows);
            }
            else{
                if(!cell.hasFlag && !current.isOpen){
                    props.openCellClick();
                    let newRows = [...rows];
                    newRows[cell.y][cell.x].isOpen = true; 
                    newRows[cell.y][cell.x].count = noOfMines;
                    setRowsState(newRows);
                    //If the current cell doesn't have mine and noOfMines around is 0, open surrounding cells.
                    if (!newRows[cell.y][cell.x].hasMine && noOfMines === 0) {
                        findAroundCell(cell);
                    }
                    if (current.hasMine && props.openCells !== 0) {
                        props.endGame();
                    }
                }
            }
        });
    };
    //Finds surrounding mines.
    const findMines = cell => {
        let minesInProximity = 0;
        for(let row = -1; row <= 1; row++){
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                  if (
                    cell.y + row < rowsState.length &&
                    cell.x + col < rowsState[0].length
                  ) {
                    if (
                        rowsState[cell.y + row][cell.x + col].hasMine &&
                      !(row === 0 && col === 0)
                    ) {
                      minesInProximity++;
                    }
                  }
                }
              }
            }
        return minesInProximity;
    }

    const findAroundCell = cell => {
        let rows = [...rowsState];
        // loop through each cell and open cells one by one in each row around it until we find one with a mine in it
        for (let row = -1; row <= 1; row++) {
          for (let col = -1; col <= 1; col++) {
            if (cell.y + row >= 0 && cell.x + col >= 0) {
              if (
                cell.y + row < rowsState.length &&
                cell.x + col < rowsState[0].length
              ) {
                if (
                  !rowsState[cell.y + row][cell.x + col].hasMine &&
                  !rows[cell.y + row][cell.x + col].isOpen
                ) {
                  open(rows[cell.y + row][cell.x + col]);
                }
              }
            }
          }
        }
      };

    const [rowsState, setRowsState] = useState(null);
    const [rowsEleState, setRowsEleState] = useState(null);
    useEffect(() => {
        if(!rowsState){
            const rows = createBoard(props);
            setRowsState(rows);
            setRowsStateHelper(rows);
        }
        else{
            setRowsStateHelper(rowsState);
        }
    }, [rowsState]);
    useEffect(() => {
        if(props.status === 'waiting'){
            const rows = createBoard(props);
            setRowsState(rows);
            setRowsStateHelper(rows);
        }
    }, [props.status]);
    const setRowsStateHelper = (rows) => {
        const rowsEle = rows.map((row, index) => {
        return (
                <Row 
                    cells={row}
                    key={index}
                    open={open}
                    flag={flag}
                />
            );
        });
        setRowsEleState(rowsEle);
    }
    return (
        <div className='board'>
            {rowsEleState}
        </div>
    );
  };
  
  export default Board;

