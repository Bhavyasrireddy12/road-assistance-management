const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // People Involved
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest',
    required: true,
    unique: true  // one payment per request
  },

  // Payment Info
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  }, 
  method: {
    type: String,
    enum: ['cash', 'upi', 'card'],
    required: true
  },

  // Transaction
  transactionId: {
    type: String,
    default: null
  },
  transactionDate: {
    type: Date,
    default: null
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 
      'failed', 'refunded'],
    default: 'pending'
  },

  // Breakdown
  breakdown: {
    baseCharge:{ type: Number, default: 0 },
    distanceCharge:{ type: Number, default: 0 },
    tax:{ type: Number, default: 0 },
    discount:{ type: Number, default: 0 },
    total:{ type: Number, default: 0 }
  },

  // Refund
  refund: {
    amount: { type: Number, default: null },
    reason: { type: String, default: null },
    refundedAt:{ type: Date, default: null  }
  },

  // Receipt
  receiptUrl: { type: String, default: null },
  notes:      { type: String, default: null }
}, { timestamps: true });
module.exports = mongoose.model('Payment',
   paymentSchema);