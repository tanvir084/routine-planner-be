const mongoose = require('mongoose');
mongoose.set('debug', true);

const scheduleSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isClass: { type: Boolean, default: false },
    isPartTimeJob: { type: Boolean, default: false },
    isDone: { type: Boolean, default: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
