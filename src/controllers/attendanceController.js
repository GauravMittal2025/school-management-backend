const Attendance = require('../models/Attendance');

// Mark or update attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, checkIn, checkOut, shift } = req.body;

    const existing = await Attendance.findOne({ employeeId, date });
    if (existing) {
      existing.status = status;
      existing.checkIn = checkIn;
      existing.checkOut = checkOut;
      existing.shift = shift;
      await existing.save();
      return res.json({ message: 'Attendance updated' });
    }

    const newAttendance = new Attendance({ employeeId, date, status, checkIn, checkOut, shift });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View attendance for a specific employee
exports.viewAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Attendance.find({ employeeId });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};
