import React from 'react';
import Cell from '../Cells';
const Row = props => {
    let cells = props.cells.map((data, index) => {
        return (
            <Cell key={index} data={data} open={props.open} flag={props.flag}/>
        )
    });
    return (
        <div className='row'>
            {cells}
        </div>
    );
}

export default Row;