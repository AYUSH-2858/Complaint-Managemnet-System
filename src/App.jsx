import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Admin from './Pages/Admin'
import Complaint from './Pages/Complaint'

import './App.css'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'

function App() {


  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
