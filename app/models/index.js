const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.schedule = require('./schedule.model');
db.studyPlan = require('./studyPlan.model');
db.generatedPlanner = require('./generatedPlanner.model');

module.exports = db;
