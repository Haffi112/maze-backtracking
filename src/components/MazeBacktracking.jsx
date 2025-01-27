import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Initial maze configuration
const initialMaze = [
  [2, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 3],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

// All possible moves: right, down, left, up
const moves = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const findPath = (maze) => {
  const path = [];
  const visited = new Set();
  const start = [0, 0];
  const end = [6, 7];
  
  const backtrack = (current, parent = null) => {
    const [row, col] = current;
    const key = `${row},${col}`;

    if (row === end[0] && col === end[1]) {
      path.push({ 
        current: [row, col],
        parent: parent,
        isBacktracking: false 
      });
      return true;
    }

    visited.add(key);
    path.push({ 
      current: [row, col],
      parent: parent,
      isBacktracking: false 
    });

    for (const [dx, dy] of moves) {
      const newRow = row + dx;
      const newCol = col + dy;
      const newKey = `${newRow},${newCol}`;

      if (
        newRow >= 0 && newRow < 8 &&
        newCol >= 0 && newCol < 8 &&
        maze[newRow][newCol] !== 1 &&
        !visited.has(newKey)
      ) {
        if (backtrack([newRow, newCol], [row, col])) {
          return true;
        }
      }
    }

    path.push({ 
      current: [row, col],
      parent: parent,
      isBacktracking: true 
    });
    return false;
  };

  backtrack(start);
  return path;
};

const MazeBacktracking = () => {
  const [maze, setMaze] = useState(() => 
    initialMaze.map(row => [...row])
  );
  const [pathIndex, setPathIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [path, setPath] = useState(() => findPath(initialMaze));
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying && pathIndex < path.length) {
      interval = setInterval(() => {
        setPathIndex(prev => {
          const next = prev + 1;
          setVisited(prevVisited => {
            const newVisited = new Set(prevVisited);
            const [row, col] = path[prev].current;
            newVisited.add(`${row},${col}`);
            return newVisited;
          });
          return next;
        });
      }, 500);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, pathIndex, path]);

  const reset = () => {
    setPathIndex(0);
    setIsPlaying(false);
    setVisited(new Set());
    setPath(findPath(maze));
    setIsEditing(true);
  };

  const togglePlay = () => {
    if (pathIndex >= path.length) {
      reset();
    }
    setIsEditing(false);
    setIsPlaying(!isPlaying);
  };

  const handleCellClick = (row, col) => {
    if (!isEditing || maze[row][col] === 2 || maze[row][col] === 3) return;
    
    const newMaze = maze.map(r => [...r]);
    newMaze[row][col] = newMaze[row][col] === 1 ? 0 : 1;
    setMaze(newMaze);
    setPath(findPath(newMaze));
    setPathIndex(0);
    setVisited(new Set());
  };

  const getCellColor = (row, col) => {
    if (maze[row][col] === 1) return 'bg-gray-800'; // Wall
    if (maze[row][col] === 2) return 'bg-green-500'; // Start
    if (maze[row][col] === 3) return 'bg-red-500'; // End
    
    // Current position and parent when backtracking
    if (pathIndex < path.length) {
      const step = path[pathIndex];
      
      // When backtracking, highlight only the parent
      if (step.isBacktracking) {
        if (step.parent && row === step.parent[0] && col === step.parent[1]) {
          return 'bg-yellow-500';
        }
      } else if (row === step.current[0] && col === step.current[1]) {
        // During forward movement, highlight current position
        return 'bg-blue-500';
      }
    }
    
    if (visited.has(`${row},${col}`)) return 'bg-gray-300'; // Visited
    return 'bg-white'; // Unvisited path
  };

  const getCellCursor = (row, col) => {
    if (!isEditing) return 'cursor-default';
    if (maze[row][col] === 2 || maze[row][col] === 3) return 'cursor-not-allowed';
    return 'cursor-pointer';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-sm text-gray-600 mb-2">
        {isEditing ? 'Click on cells to add/remove walls' : 'Simulation running...'}
      </div>

      <div className="grid grid-cols-8 gap-1 p-4 bg-gray-100 rounded-lg">
        {maze.map((row, i) => (
          row.map((_, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleCellClick(i, j)}
              className={`w-12 h-12 rounded-sm ${getCellColor(i, j)} ${getCellCursor(i, j)}`}
            />
          ))
        ))}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Steps: {pathIndex} / {path.length}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
          <span>End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span>Forward Movement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
          <span>Backtracking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></div>
          <span>Unvisited Path</span>
        </div>
      </div>
    </div>
  );
};

export default MazeBacktracking;