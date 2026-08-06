const mongoose = require('mongoose');

const notificationSchema = 
                        new mongoose.Schema({
  // Receiver
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiverType: {
    type: String,
    enum: ['user', 'provider', 'admin'],
    required: true
  },

  // Notification Info
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'request_created',    // new request created
      'request_accepted',   // provider accepted
      'request_ongoing',    // service started
      'request_completed',  // service completed
      'request_cancelled',  // request cancelled
      'payment_received',   // payment done
      'review_received',    // got a new review
      'account_verified',   // account verified by admin
      'general'             // general notification
    ],
    default: 'general'
  },

  // Reference
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null  // request id or payment id
  },
  referenceType: {
    type: String,
    enum: ['ServiceRequest', 'Payment', 
      'Review', null],
    default: null
  },

  // Status
  isRead: { type: Boolean, default: false },
  readAt: { type: Date,    default: null  }

}, { timestamps: true });

module.exports = mongoose.model('Notification', 
  notificationSchema);