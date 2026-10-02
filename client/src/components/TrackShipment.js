import React, { useState } from 'react';
import axios from 'axios';

function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setShipment(null);

    try {
      const response = await axios.get(`/api/shipments/track/${trackingNumber}`);
      setShipment(response.data);
    } catch (error) {
      setError('Shipment not found');
    }
  };

  return (
    <div className="card">
      <h2>Track Shipment</h2>
      <form onSubmit={handleTrack}>
        <div className="form-group">
          <label>Tracking Number</label>
          <input 
            type="text" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Track</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {shipment && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Shipment Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <h4>Status</h4>
              <span className={`status-badge status-${shipment.status}`}>
                {shipment.status}
              </span>
            </div>
            <div>
              <h4>Tracking Number</h4>
              <p>{shipment.trackingNumber}</p>
            </div>
            <div>
              <h4>Origin</h4>
              <p>{shipment.origin}</p>
            </div>
            <div>
              <h4>Destination</h4>
              <p>{shipment.destination}</p>
            </div>
            <div>
              <h4>Sender</h4>
              <p>{shipment.sender.name}</p>
              <p>{shipment.sender.phone}</p>
            </div>
            <div>
              <h4>Receiver</h4>
              <p>{shipment.receiver.name}</p>
              <p>{shipment.receiver.phone}</p>
            </div>
            <div>
              <h4>Estimated Delivery</h4>
              <p>{shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : 'N/A'}</p>
            </div>
            {shipment.actualDelivery && (
              <div>
                <h4>Actual Delivery</h4>
                <p>{new Date(shipment.actualDelivery).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackShipment;
