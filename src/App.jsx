import MazeBacktracking from './components/MazeBacktracking'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Maze Backtracking Visualization</h1>
        <MazeBacktracking />
      </div>
    </div>
  )
}

export default App