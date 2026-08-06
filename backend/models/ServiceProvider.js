const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const serviceProviderSchema = new mongoose.Schema({
  // Basic Info
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    enum: ['towing', 'fuel', 'tire', 'mechanic', 'battery'],
    required: true
  },

  // Profile
  profileImage: { 
    type: String, 
    default: null 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    default: null 
  },
  dateOfBirth: { 
    type: Date, 
    default: null 
  },
  experience: { 
    type: Number,  // years of experience
    default: 0 
  },
  bio: { 
    type: String, 
    default: null 
  },

  // Address
  address: {
    street:  { type: String, default: null },
    city:    { type: String, default: null },
    state:   { type: String, default: null },
    pincode: { type: String, default: null }
  },

  // Location
  location: {
    latitude:  { type: Number, default: null },
    longitude: { type: Number, default: null }
  },

  // Vehicle Info
  vehicleInfo: {
    vehicleNumber: { type: String, default: null },
    vehicleType:   { type: String, default: null },
    vehicleModel:  { type: String, default: null }
  },

  // Documents
  documents: {
    license:     { type: String, default: null }, // file path
    certificate: { type: String, default: null }, // file path
    idProof:     { type: String, default: null }  // file path
  },

  // Availability
  isAvailable: { type: Boolean, default: true },
  workingHours: {
    from: { type: String, default: '08:00' },
    to:   { type: String, default: '20:00' }
  },

  // Account Status
  isVerified:  { type: Boolean, default: false },
  isActive:    { type: Boolean, default: true  },
  isBanned:    { type: Boolean, default: false },

  // Ratings
  rating:       { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  // Stats
  completedJobs:   { type: Number, default: 0 },
  cancelledJobs:   { type: Number, default: 0 },
  totalEarnings:   { type: Number, default: 0 },

  // Service Charges
  charges: {
    baseCharge:     { type: Number, default: 0 },
    perKmCharge:    { type: Number, default: 0 }
  },

  // Auth
  otp:              { type: String, default: null },
  otpExpiry:        { type: Date,   default: null },
  resetToken:       { type: String, default: null },
  resetTokenExpiry: { type: Date,   default: null },
  lastLogin:        { type: Date,   default: null }

}, { timestamps: true });

// Hash password before saving
serviceProviderSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
serviceProviderSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);