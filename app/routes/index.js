const authRouter = require('./auth.routes');
const scheduleRouter = require('./schedule.routes');
const studyPlanRouter = require('./studyPlan.routes');
const generatedPlanner = require('./generatedPlanner.routes');

module.exports = {
  ...authRouter,
  ...scheduleRouter,
  ...studyPlanRouter,
  ...generatedPlanner,
};
