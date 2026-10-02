import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import ShipmentList from './components/ShipmentList';
import CreateShipment from './components/CreateShipment';
import TrackShipment from './components/TrackShipment';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">📦 Logistics Manager</h1>
            <ul className="nav-links">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/shipments">Shipments</Link></li>
              <li><Link to="/create">New Shipment</Link></li>
              <li><Link to="/track">Track</Link></li>
            </ul>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<ShipmentList />} />
            <Route path="/create" element={<CreateShipment />} />
            <Route path="/track" element={<TrackShipment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
