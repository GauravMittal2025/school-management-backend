const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  shift: { type: String, enum: ['Morning', 'Evening', 'Night'] },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
