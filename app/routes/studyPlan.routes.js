const express = require('express');
const studyPlanRouter = express.Router();

const {
  createStudyPlan,
  updateStudyPlan,
  getAllStudyPlans,
  getStudyPlanById,
  studyPlanToDoList,
} = require('../controller');

/*
  Jwt Check Imports
*/
const { userCheck } = require('../middlewares/userCheck');
const passport = require('passport');

studyPlanRouter.post(
  '/api/studyPlan/create',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  createStudyPlan
);
studyPlanRouter.patch(
  '/api/studyPlan/update/:studyPlanId',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  updateStudyPlan
);
studyPlanRouter.get(
  '/api/studyPlan/get-all',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  getAllStudyPlans
);
studyPlanRouter.get(
  '/api/studyPlan/get/:studyPlanId',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  getStudyPlanById
);

studyPlanRouter.get(
  '/api/studyPlan/to-do/list',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  studyPlanToDoList
);

module.exports = {
  studyPlanRouter,
};
