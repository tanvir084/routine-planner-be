const authControllers = require("./auth.controller");
const scheduleControllers = require('./schedule.controller');
const studyPlanControllers = require('./studyPlan.controller');
const generatedStudyPlanners = require('./generatedStudyPlanner.controller');

module.exports = {
  ...authControllers,
  ...scheduleControllers,
  ...studyPlanControllers,
  ...generatedStudyPlanners,
};
