const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  receiver: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  packageDetails: {
    weight: { type: Number, required: true },
    dimensions: { type: String },
    description: { type: String }
  },
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  estimatedDelivery: { type: Date },
  actualDelivery: { type: Date },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
