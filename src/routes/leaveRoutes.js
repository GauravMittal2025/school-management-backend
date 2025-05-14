const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const auth = require('../middlewares/authmiddleware');
const { authorizeRoles } = require('../middlewares/rolemiddleware');

router.post('/apply', auth, leaveController.applyLeave);
router.get('/my', auth, leaveController.viewLeaves);
router.patch('/:id/status', auth, authorizeRoles('admin'), leaveController.updateLeaveStatus);

module.exports = router;