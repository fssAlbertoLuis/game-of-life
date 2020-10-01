import React from 'react';
import Cell from './cell';

export default ({gridSize, startGame, refreshRate}) => {

  const [grid, setGrid] = React.useState([]);
  const [generations, setGenerations] = React.useState(0);

  const newBoard = React.useCallback(() => {
    let grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid.push([]);
      for (let j = 0; j < gridSize; j++) {
        grid[i].push(false);
      }
    }
    return grid;
  }, [gridSize]);

  React.useEffect(() => {
    setGrid(newBoard())
  }, [gridSize, newBoard]);

  
  const countNeighbors = React.useCallback((y, x) => {
    const neighbors = [
      [-1, -1], [0, -1], [1, -1], [1, 0],
      [1, 1], [0, 1], [-1, 1], [-1, 0]
    ];
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const posy = y + neighbors[i][0];
      const posx = x + neighbors[i][1];
      if ((posy > -1 && posy < grid.length) && (posx > -1 && posx < grid.length)) {
        count += grid[posy][posx] ? 1 : 0;
      }
      if (count > 3) {
        break;
      }
    }
    return count;
  }, [grid]);

  React.useEffect(() => {
    function cycle() {
      const g = [];
      for (let i = 0; i < grid.length; i++) {
        g[i] = [];
        const row = grid[i];
          for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const neighborsCount = countNeighbors(i, j);
            let activation = false;
            if (cell) {
              if (neighborsCount >= 2 && neighborsCount <= 3) {
                activation = true;
              }  
            } else {
              if (neighborsCount === 3) {
                activation = true;
              }
            }
            g[i].push(activation);
          }
      }
      setGenerations(generations+1);
      return g;
    }
    let interval = null;
    if (startGame) {
      interval = setInterval(() => {
        const n = cycle();
        setGrid([...n]);
      }, refreshRate);
    } else {
      console.log('ok')
      setGenerations(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    startGame, refreshRate, grid, countNeighbors, 
    generations, setGenerations, newBoard
  ]);

  const generateBoard = React.useMemo(() => {
    return grid.map(
      (row, i) => (
        <div className="board-row" key={i}>
          {row.map((c, j) => (
            <Cell 
              key={(i+1)*j} 
              activated={c} 
              x={i} y={j} 
              setActivated={(x, y) => {
                const n = [...grid];
                n[x][y] = !n[x][y];
                setGrid([...n]);
              }}
            />
          ))}
        </div>
      )
    );
  }, [grid]);

  return (
    <div>
      <div>Generations: {generations}</div>
      <div>{generateBoard}</div>    
    </div>
  );
};
