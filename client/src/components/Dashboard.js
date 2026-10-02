import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/shipments');
      const shipments = response.data;
      
      setStats({
        total: shipments.length,
        pending: shipments.filter(s => s.status === 'pending').length,
        inTransit: shipments.filter(s => s.status === 'in-transit').length,
        delivered: shipments.filter(s => s.status === 'delivered').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Shipments</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h3>{stats.inTransit}</h3>
          <p>In Transit</p>
        </div>
        <div className="stat-card">
          <h3>{stats.delivered}</h3>
          <p>Delivered</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
