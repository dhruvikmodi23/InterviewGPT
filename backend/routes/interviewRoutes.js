// routes/interviewRoutes.js
const express = require('express');
const interviewController = require('../controllers/interviewController');
const authController = require('../controllers/authControoler');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/start', interviewController.startInterview);
router.get('/history', interviewController.getInterviewHistory);
router.get('/:id', interviewController.getInterview);

module.exports = router;