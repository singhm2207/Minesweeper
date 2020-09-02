import React from 'react';
const Cell = props => {
    let renderCell = () => {
        if(props.data.isOpen){
            if(props.data.hasMine){
                return (
                    <div className='cell open' onClick={ () => {props.open(props.data)}} onContextMenu={e => {
                        // don't load that context menu
                        e.preventDefault();
                      }}>
                        <strong>(X)</strong>
                    </div>
                )
            }
            else if (props.data.count === 0){
                return (
                    <div className='cell open' onClick={ () => {props.open(props.data)}} onContextMenu={e => {
                        e.preventDefault();
                        props.flag(props.data);
                      }}>
                    </div>
                )
            }
            else{
                return (
                    <div className='cell open' onClick={ () => {props.open(props.data)}} onContextMenu={e => {
                        e.preventDefault();
                      }}>
                        {props.data.count}
                    </div>
                )
            }
        }
        else if (props.data.hasFlag) {
            return (
              <div
                className="cell"
                onContextMenu={e => {
                  e.preventDefault();
                  props.flag(props.data);
                }}
                onClick={() => props.open(props.data)}
              >
                <strong>|></strong>
              </div>
            );
          } 
        else {
               return( <div className='cell closed'  onClick={() => props.open(props.data)}  onContextMenu={e => {
                e.preventDefault();
                props.flag(props.data);
              }}>
                    
                </div>);
        }
    }
    return renderCell();
}

export default Cell;