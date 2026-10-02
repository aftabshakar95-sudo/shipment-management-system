import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShipmentList() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('/api/shipments');
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/shipments/${id}`, { status: newStatus });
      fetchShipments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteShipment = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        await axios.delete(`/api/shipments/${id}`);
        fetchShipments();
      } catch (error) {
        console.error('Error deleting shipment:', error);
      }
    }
  };

  return (
    <div className="card">
      <h2>All Shipments</h2>
      <table>
        <thead>
          <tr>
            <th>Tracking #</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(shipment => (
            <tr key={shipment._id}>
              <td>{shipment.trackingNumber}</td>
              <td>{shipment.sender.name}</td>
              <td>{shipment.receiver.name}</td>
              <td>{shipment.origin}</td>
              <td>{shipment.destination}</td>
              <td>
                <span className={`status-badge status-${shipment.status}`}>
                  {shipment.status}
                </span>
              </td>
              <td>
                <select 
                  value={shipment.status}
                  onChange={(e) => updateStatus(shipment._id, e.target.value)}
                  style={{ marginRight: '10px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteShipment(shipment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentList;
