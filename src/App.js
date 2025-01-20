import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={
            <div className="App-header">
              <h1>Welcome to React</h1>
              <Link to="/dashboard" className="App-link">Go to Dashboard</Link>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
