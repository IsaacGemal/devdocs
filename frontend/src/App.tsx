import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DevDocsApp from './components/DocScoreApp.tsx'
import About from './components/About.tsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<DevDocsApp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
