const express = require('express');
const router = express.Router();
const {
  getAllProviders,
  getProviderById,
  getProviderDashboard,
  updateProviderProfile,
  toggleAvailability,
  getProviderRequests,
  getProviderNotifications,
  markProviderNotificationsRead
} = require('../controllers/providerController');
const { protect } = 
require('../middleware/authMiddleware');

// Public routes
router.get('/',getAllProviders);
// Protected routes
router.get('/dashboard',
  protect, getProviderDashboard);
router.put('/profile',            
  protect, updateProviderProfile);
router.put('/availability',      
   protect, toggleAvailability);
router.get('/my-requests',        
  protect, getProviderRequests);
router.get('/notifications',      
  protect, getProviderNotifications);
router.put('/notifications/read', 
  protect, markProviderNotificationsRead);

// Public routes with parameters (Must be last)
router.get('/:id', getProviderById);

module.exports = router;