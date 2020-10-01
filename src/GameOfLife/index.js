import React from 'react';
import Board from './board';
import './index.css';

export default () => {
  const [gridSize, setGridSize] = React.useState(32);
  const [startGame, setStartGame] = React.useState(false);
  const [refreshRate, setRefreshRate] = React.useState(1000);
  const start = () => {
    setStartGame(!startGame);
  }

  return (
    <div className="game">
      <div className="game-title">
        <h4>Conway's Game of Life</h4>
        <span>Select grid size: </span>
        <select value={gridSize} onChange={(e) => setGridSize(e.target.value)}>
          {
            [8, 16, 32].map(n => <option key={n} value={n}>{n}</option>)
          }
        </select>
        <span>Refresh rate: </span>
        <select 
          value={refreshRate} 
          onChange={(e) => setRefreshRate(e.target.value)}
        >
          {
            [100, 500, 1000].map(n => <option key={n} value={n}>{n}ms</option>)
          }
        </select>
        <button onClick={start}>{startGame ? 'Stop' : 'Start'}</button>
      </div>
      <div className="game-board">
        <Board 
          gridSize={gridSize} 
          refreshRate={refreshRate} 
          startGame={startGame} 
        />
      </div>
    </div>
  );
}