const Leave = require('../models/Leave');

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const employeeId = req.user.id;

    const newLeave = new Leave({ employeeId, startDate, endDate, reason });
    await newLeave.save();

    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply leave' });
  }
};

// View own leaves
exports.viewLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const leaves = await Leave.find({ employeeId });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaves' });
  }
};

// Approve or reject leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = status;
    await leave.save();

    res.json({ message: 'Leave status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave status' });
  }
};
