const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single shipment by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new shipment
router.post('/', async (req, res) => {
  const shipment = new Shipment({
    trackingNumber: 'TRK' + Date.now(),
    sender: req.body.sender,
    receiver: req.body.receiver,
    packageDetails: req.body.packageDetails,
    origin: req.body.origin,
    destination: req.body.destination,
    estimatedDelivery: req.body.estimatedDelivery
  });

  try {
    const newShipment = await shipment.save();
    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update shipment status
router.patch('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    if (req.body.status) {
      shipment.status = req.body.status;
      if (req.body.status === 'delivered') {
        shipment.actualDelivery = new Date();
      }
    }

    const updatedShipment = await shipment.save();
    res.json(updatedShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete shipment
router.delete('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    await shipment.deleteOne();
    res.json({ message: 'Shipment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
