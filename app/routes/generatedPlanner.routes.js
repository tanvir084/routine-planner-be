const express = require('express');
const generatedPlanner = express.Router();

const {
  generateStudyPlanner,
  getAllGenerateStudyPlanner,
  doneCertainPlan,
} = require('../controller');

/*
  Jwt Check Imports
*/
const { userCheck } = require('../middlewares/userCheck');
const passport = require('passport');

generatedPlanner.post(
  '/api/generatedPlanner/create',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  generateStudyPlanner
);
generatedPlanner.patch(
  '/api/generatedPlanner/update/:generatedPlannerId',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  doneCertainPlan
);
generatedPlanner.get(
  '/api/generatedPlanner/get-all',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  getAllGenerateStudyPlanner
);

module.exports = {
  generatedPlanner,
};
