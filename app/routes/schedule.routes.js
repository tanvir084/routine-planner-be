const express = require('express');
const scheduleRouter = express.Router();

const {
  createSchedule,
  updateSchedule,
  getAllSchedules,
  getScheduleById,
  scheduleToDoList,
} = require('../controller');

/*
  Jwt Check Imports
*/
const { userCheck } = require('../middlewares/userCheck');
const passport = require('passport');

scheduleRouter.post(
  '/api/schedule/create',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  createSchedule
);
scheduleRouter.patch(
  '/api/schedule/update/:scheduleId',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  updateSchedule
);
scheduleRouter.get(
  '/api/schedule/get-all',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  getAllSchedules
);
scheduleRouter.get(
  '/api/schedule/get/:scheduleId',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  getScheduleById
);

scheduleRouter.get(
  '/api/schedule/to-do/list',
  passport.authenticate('jwt', { session: false }),
  userCheck,
  scheduleToDoList
);

module.exports = {
  scheduleRouter,
};
