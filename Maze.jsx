import React, { useState } from 'react';
import { generateSolvableMaze } from './utils/mazeAlgorithms.js';
import './style/Maze.css';

const Maze = () => {
  const [maze, setMaze] = useState(() => generateSolvableMaze(15, 15)); // Initial maze generation

  const regenerateMaze = () => {
    setMaze(generateSolvableMaze(15, 15)); // Generate a new maze on button click
  };

  return (
    <div className="maze-container"> 
      <button className="generate-button" onClick={regenerateMaze}>
        Generate New Maze
      </button> 
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maze;
