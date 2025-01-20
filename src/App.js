import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={
            <div className="App-header">
              <h1>Welcome to React</h1>
              <Link to="/dashboard" className="App-link">Go to Dashboard</Link>
            </div>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
