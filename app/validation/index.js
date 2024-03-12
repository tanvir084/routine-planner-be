const { signinValidation } = require('./signin.validation');
const { signupValidation } = require('./signup.validation');
const { scheduleValidation } = require('./schedule.validation');
const { studyPlanValidation } = require('./studyPlan.validation');
const { generatedPlannerValidation } = require('./generatedPlanner.validation');

module.exports = {
  signupValidation,
  signinValidation,
  scheduleValidation,
  studyPlanValidation,
  generatedPlannerValidation,
};
