import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateShipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    weight: '',
    dimensions: '',
    description: '',
    origin: '',
    destination: '',
    estimatedDelivery: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shipment = {
        sender: {
          name: formData.senderName,
          address: formData.senderAddress,
          phone: formData.senderPhone
        },
        receiver: {
          name: formData.receiverName,
          address: formData.receiverAddress,
          phone: formData.receiverPhone
        },
        packageDetails: {
          weight: formData.weight,
          dimensions: formData.dimensions,
          description: formData.description
        },
        origin: formData.origin,
        destination: formData.destination,
        estimatedDelivery: formData.estimatedDelivery
      };

      await axios.post('/api/shipments', shipment);
      alert('Shipment created successfully!');
      navigate('/shipments');
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Error creating shipment');
    }
  };

  return (
    <div className="card">
      <h2>Create New Shipment</h2>
      <form onSubmit={handleSubmit}>
        <h3>Sender Information</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="senderAddress" value={formData.senderAddress} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="senderPhone" value={formData.senderPhone} onChange={handleChange} required />
        </div>

        <h3>Receiver Information</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="receiverAddress" value={formData.receiverAddress} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} required />
        </div>

        <h3>Package Details</h3>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Dimensions</label>
          <input type="text" name="dimensions" placeholder="e.g., 30x20x10 cm" value={formData.dimensions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
        </div>

        <h3>Shipping Details</h3>
        <div className="form-group">
          <label>Origin</label>
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Estimated Delivery</label>
          <input type="date" name="estimatedDelivery" value={formData.estimatedDelivery} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Create Shipment</button>
      </form>
    </div>
  );
}

export default CreateShipment;
