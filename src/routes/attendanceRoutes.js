const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Define Routes
router.post('/mark', attendanceController.markAttendance);
router.get('/view/:employeeId', attendanceController.viewAttendance);

module.exports = router;
