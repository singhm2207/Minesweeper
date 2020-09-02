import React from 'react';

const BoardHead = props => {
    const renderHead = () => {
        if(props.status === 'running'){
            return (
                <div className='board-head'>
            <div className='flag-count'>
            Flags: {props.flagCount}
            </div>
                <button className='reset running' onClick={props.reset}>{props.status.toUpperCase()}</button>
            </div>
            )
        }
        else if(props.status === 'ended'){
            return (
                <div className='board-head'>
            <div className='flag-count'>
            Flags: {props.flagCount}
            </div>
                <button className='reset ended' onClick={props.reset}>{props.status.toUpperCase()}</button>
            </div>
            )
        }
        else if(props.status === 'winner'){
            return (
                <div className='board-head'>
            <div className='flag-count'>
                Flags: {props.flagCount}
            </div>
                <button className='reset winner' onClick={props.reset}>{props.status.toUpperCase()}</button>
            </div>
            )
        }
        else{
            return (
                <div className='board-head'>
            <div className='flag-count'>
            Flags: {props.flagCount}
            </div>
                <button className='reset waiting' onClick={props.reset}>{props.status.toUpperCase()}</button>
            </div>
            )
        }
    }
    return renderHead();
}

export default BoardHead;