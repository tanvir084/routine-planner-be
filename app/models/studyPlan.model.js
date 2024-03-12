const mongoose = require('mongoose');
mongoose.set('debug', true);

const studyPlanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    finishDate: { type: String, required: false },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    priority: { type: Number, required: true },
    learningPurpose: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);

module.exports = StudyPlan;
