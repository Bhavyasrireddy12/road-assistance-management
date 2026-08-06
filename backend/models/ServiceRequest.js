const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  // People Involved
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceProvider', 
    default: null 
  },
  vehicleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },

  // Service Info
  serviceType: {
    type: String,
    enum: ['towing', 'fuel', 'tire', 'mechanic', 'battery'],
    required: true
  },
  description: { 
    type: String, 
    default: null 
  },
  images: [{ type: String }], // problem images from user

  // Location
  userLocation: {
    latitude:  { type: Number, required: true },
    longitude: { type: Number, required: true },
    address:   { type: String, default: null  }
  },
  providerLocation: {
    latitude:  { type: Number, default: null },
    longitude: { type: Number, default: null }
  },

  // Status
  status: {
    type: String,
    enum: [
      'pending',    // request created
      'accepted',   // provider accepted
      'ongoing',    // service in progress
      'completed',  // service done
      'cancelled'   // cancelled
    ],
    default: 'pending'
  },
  cancelReason: { type: String, default: null },
  cancelledBy:  { 
    type: String, 
    enum: ['user', 'provider', 'admin', null], 
    default: null 
  },

  // OTP Verification
  otp:           { type: String,  default: null },
  isOtpVerified: { type: Boolean, default: false },

  // Pricing
  estimatedPrice: { type: Number, default: 0 },
  finalPrice:     { type: Number, default: 0 },
  distance:       { type: Number, default: 0 }, // in km

  // Payment
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', null],
    default: null
  },

  // Time Tracking
  estimatedTime:  { type: Number, default: null }, // in minutes
  acceptedAt:     { type: Date,   default: null },
  startedAt:      { type: Date,   default: null },
  completedAt:    { type: Date,   default: null },
  cancelledAt:    { type: Date,   default: null },

  // Status Timeline
  timeline: [
    {
      status:    { type: String },
      message:   { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],

  // Review
  isReviewed: { type: Boolean, default: false },

  // Provider Notes
  providerNotes: { type: String, default: null }

}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);