const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  // Owner
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Basic Info
  brand: { 
    type: String, 
    required: true,
    trim: true
  },
  model: { 
    type: String, 
    required: true,
    trim: true
  },
  year: { 
    type: Number, 
    required: true 
  },
  color: { 
    type: String, 
    default: null 
  },
  licensePlate: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,
    trim: true
  },

  // Fuel & Type
  fuelType: { 
    type: String, 
    enum: ['petrol', 'diesel', 'electric', 'cng', 'hybrid'], 
    required: true 
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'truck', 'bus', 'auto', 'van'],
    required: true
  },

  // Insurance
  insurance: {
    policyNumber: { type: String, default: null },
    provider:     { type: String, default: null },
    expiryDate:   { type: Date,   default: null }
  },

  // Service History
  lastServiceDate: { type: Date,   default: null },
  mileage:         { type: Number, default: 0    },

  // Images
  images: [{ type: String }], // array of image paths

  // Status
  isPrimary: { type: Boolean, default: false }, // main vehicle
  isActive:  { type: Boolean, default: true  }

}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);