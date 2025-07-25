const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile/:userId', authController.getProfile);
router.post('/address/:userId', authController.updateAddress);

module.exports = router; 