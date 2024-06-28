export const generateSolvableMaze = (width, height) => {
    const maze = Array.from({ length: height }, () => Array(width).fill('wall')); // Initializes a grid filled with 'wall' type
  
    const carvePassages = (cx, cy) => {
      const directions = [
        [0, -2],  // Up
        [0, 2],   // Down
        [-2, 0],  // Left
        [2, 0]    // Right
      ];
  
      directions.sort(() => Math.random() - 0.5); // Shuffle directions
  
      for (let [dx, dy] of directions) { // iterates over each element in the directions array
        const Newx = cx + dx; // represent the cell to move to from the current cell
        const Newy = cy + dy;
  
        if (
          Newx >= 0 && Newx < width && // Checks if within bounds
          Newy >= 0 && Newy < height &&
          maze[Newy][Newx] === 'wall'  // Checks if the new cell is still a wall
        ) {
          maze[cy + dy / 2][cx + dx / 2] = 'passage'; // Carves path
          maze[Newy][Newx] = 'passage'; // Mark the cell as 'passage'
          carvePassages(Newx, Newy); // Recurse into the new cell
        }
      }
    };
  
    maze[1][0] = 'passage'; // Start carving from (1, 0)/ start of the maze
    maze[13][14] = 'passage' // Exit of the maze
    carvePassages(1, 1); // Start carving passages
  
    return maze; // Returns the generated maze
  };
  