const mongoose = require('mongoose');
mongoose.set('debug', true);

const generatedPlannerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: Number, required: true },
    generatedPlanner: { type: Array },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const GeneratedPlanner = mongoose.model(
  'GeneratedPlanner',
  generatedPlannerSchema
);

module.exports = GeneratedPlanner;
