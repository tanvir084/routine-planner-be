const db = require('../models');

const { scheduleValidation } = require('../validation');

const Schedule = db.schedule;

const createSchedule = async (req, res) => {
  try {
    const { title, date, startTime, endTime, isClass, isPartTimeJob } =
      req?.body ?? {};

    // VALIDATE THE DATA BEFORE CREATING SCHEDULE
    const { error } = scheduleValidation({ title, date, startTime, endTime });

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    const schedule = await Schedule.create({
      userId: req?.user?._id,
      title,
      date,
      startTime,
      endTime,
      isClass,
      isPartTimeJob,
    });

    if (!schedule) {
      return res.status(500).send({
        success: false,
        message: 'Can not create schedule now. Try again after sometime.',
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Schedule created successfully.',
      data: schedule,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req?.params?.scheduleId;

    const schedule = await Schedule.findOne({
      _id: scheduleId,
      userId: req?.user?._id,
    });

    if (!schedule) {
      return res
        .status(404)
        .send({ success: false, message: 'Schedule not found.' });
    }

    const { title, date, startTime, endTime, isClass, isPartTimeJob, isDone } =
      req?.body ?? {};

    // VALIDATE THE DATA BEFORE UPDATING SCHEDULE
    const { error } = scheduleValidation({ title, date, startTime, endTime });

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        title,
        date,
        startTime,
        endTime,
        isClass,
        isPartTimeJob,
        isDone,
      },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(500).send({
        success: false,
        message: 'Can not update schedule now. Try again after sometime.',
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Schedule updated successfully.',
      data: updatedSchedule,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req?.user?._id });

    if (!schedules?.length) {
      return res
        .status(404)
        .send({ success: false, message: 'Schedules not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Schedules found successfully.',
      data: schedules,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req?.params?.scheduleId,
      userId: req?.user?._id,
    });

    if (!schedule) {
      return res
        .status(404)
        .send({ success: false, message: 'Schedule not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Schedule found successfully.',
      data: schedule,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const scheduleToDoList = async (req, res) => {
  try {
    const sorting = req?.query?.sorting;
    const classSchedule = req?.query?.classSchedule;
    const jobSchedule = req?.query?.jobSchedule;

    let scheduleQuery = {};

    if (classSchedule == true && jobSchedule == false) {
      scheduleQuery = {
        isClass: true,
        isPartTimeJob: false,
      };
    } else if (classSchedule == false && jobSchedule == true) {
      scheduleQuery = {
        isClass: false,
        isPartTimeJob: true,
      };
    }

    const schedules = await Schedule.find({
      userId: req?.user?._id,
      isDone: false,
      ...scheduleQuery,
    }).sort({ date: sorting == 'asc' ? 1 : -1 });

    if (!schedules?.length) {
      return res
        .status(404)
        .send({ success: false, message: 'Schedules not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Schedules found successfully.',
      data: schedules,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

module.exports = {
  createSchedule,
  updateSchedule,
  getAllSchedules,
  getScheduleById,
  scheduleToDoList,
};
