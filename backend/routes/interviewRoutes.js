const express = require('express');
const interviewController = require('../controllers/interviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/start', interviewController.startInterview);
router.post('/submit', interviewController.submitCode);
router.get('/history', interviewController.getInterviewHistory);
router.get('/:id', interviewController.getInterview);

module.exports = router;