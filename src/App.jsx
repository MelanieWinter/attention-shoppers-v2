import { Routes, Route} from 'react-router-dom';
import Splash from './pages/Splash/Splash'
import Lobby from './pages/Lobby/Lobby'
import Game from './pages/Game/Game'
import './App.css'

function App() {
  return (
    <main className='App'>
      <Routes>
      <Route 
          path="/game"
          element={<Game />} 
        />
        <Route 
          path="/lobby"
          element={<Lobby />} 
        />
        <Route 
          path="/" 
          element={<Splash />} 
        />
      </Routes>
    </main>
  )
}

export default App
