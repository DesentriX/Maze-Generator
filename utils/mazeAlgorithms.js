export const generateSolvableMaze = (width, height, startX = 1, startY = 0, endX = width - 2, endY = height - 1) => {
  const maze = Array.from({ length: height }, () => Array(width).fill('wall')); // Initialize the grid with 'wall'

  //shuffle directions
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Carve passages using DFS
  const carvePassages = (startX, startY) => {
    const stack = [[startX, startY]];
    const directions = [
      [0, -2],  // Up
      [0, 2],   // Down
      [-2, 0],  // Left
      [2, 0]    // Right
    ];

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      shuffleArray(directions); // Shuffle directions

      for (let [dx, dy] of directions) {
        const newX = cx + dx;
        const newY = cy + dy;

        // Check if the move is within bounds and the target cell is still a wall
        if (
          newX >= 0 && newX < width &&
          newY >= 0 && newY < height &&
          maze[newY][newX] === 'wall'
        ) {
          // Carve passage between current cell and new cell
          maze[cy + dy / 2][cx + dx / 2] = 'passage';
          maze[newY][newX] = 'passage';
          stack.push([newX, newY]); // Add the new cell to the stack
        }
      }
    }
  };

  // Set the start and end points dynamically
  maze[startY][startX] = 'passage'; // Start position
  maze[endY][endX] = 'passage';     // End position

  // Start carving from the first passage
  carvePassages(startX, startY + 1); // Start carving inside the maze

  return maze; 
};
