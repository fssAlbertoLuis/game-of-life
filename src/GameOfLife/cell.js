import React from 'react';

export default ({activated, setActivated, x, y}) => {
  return (
    <div
      onClick={() => {
        setActivated(x, y);
      }}
      className="board-cell" 
      style={{backgroundColor: activated ? 'gray': 'white'}}
    ></div>
  )
}
