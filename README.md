# Maze Backtracking Visualization

An interactive visualization of the backtracking algorithm solving a maze. This project demonstrates how backtracking works by showing the algorithm's step-by-step progress through the maze, including its exploration of dead ends and the backtracking process.

[Live Demo](https://YOUR_USERNAME.github.io/maze-backtracking/)

![Maze Backtracking Demo](screenshot.png)

## Features

- **Interactive Maze Editor**: Click to add or remove walls in the maze
- **Step-by-Step Visualization**: Watch the algorithm explore the maze in real-time
- **Backtracking Visualization**: See how the algorithm handles dead ends and backtracks to find alternative paths
- **Play/Pause Control**: Control the visualization pace
- **Reset Functionality**: Start over with a clean slate
- **Color-Coded States**:
  - Green: Start position
  - Red: End position
  - Blue: Current forward exploration
  - Yellow: Backtracking position
  - Gray: Previously visited cells
  - Black: Walls
  - White: Unvisited paths

## How It Works

The visualization implements a depth-first search with backtracking to find a path from the start (top-left) to the end (bottom-right). The algorithm:

1. Explores forward (blue) until it reaches either:
   - The goal
   - A dead end
   - A cell with no unvisited neighbors
2. When stuck, backtracks (yellow) to the most recent cell with unexplored paths
3. Continues exploration from there until the goal is reached

## Technologies Used

- React
- Vite
- Tailwind CSS
- Lucide React (for icons)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/haffi112/maze-backtracking.git
cd maze-backtracking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

Contributions are welcome! Some ideas for improvements:

- Add different maze generation algorithms
- Allow customizable maze sizes
- Add animation speed control
- Implement different pathfinding algorithms
- Add statistics (steps taken, cells visited, etc.)

## License

MIT License - feel free to use this code for your own projects!

## Author

Hafsteinn Einarsson (but mostly just Claude Sonnet 3.5 with my encouragement)

## Acknowledgments

This project was created as an educational tool to help visualize and understand backtracking algorithms. Special thanks to all the open-source libraries that made this possible.