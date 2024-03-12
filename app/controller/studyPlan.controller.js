const db = require('../models');

const { studyPlanValidation } = require('../validation');

const StudyPlan = db.studyPlan;

const createStudyPlan = async (req, res) => {
  try {
    const { title, finishDate, duration, priority, learningPurpose } =
      req?.body ?? {};

    // VALIDATE THE DATA BEFORE CREATING STUDY PLAN
    const { error } = studyPlanValidation({
      title,
      duration,
      priority,
      learningPurpose,
    });

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    const studyPlan = await StudyPlan.create({
      userId: req?.user?._id,
      title,
      finishDate,
      duration,
      priority,
      learningPurpose,
    });

    if (!studyPlan) {
      return res.status(500).send({
        success: false,
        message: 'Can not create study plan now. Try again after sometime.',
      });
    }

    return res.status(201).send({
      success: true,
      message: 'study plan created successfully.',
      data: studyPlan,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const updateStudyPlan = async (req, res) => {
  try {
    const studyPlanId = req?.params?.studyPlanId;

    const studyPlan = await StudyPlan.findOne({
      _id: studyPlanId,
      userId: req?.user?._id,
    });

    if (!studyPlan) {
      return res
        .status(404)
        .send({ success: false, message: 'Study plan not found.' });
    }

    const { title, finishDate, duration, priority, learningPurpose, isDone } =
      req?.body ?? {};

    // VALIDATE THE DATA BEFORE UPDATING STUDY PLAN
    const { error } = studyPlanValidation({
      title,
      duration,
      priority,
      learningPurpose,
    });

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    const updatedStudyPlan = await StudyPlan.findByIdAndUpdate(
      studyPlanId,
      {
        title,
        finishDate,
        duration,
        priority,
        learningPurpose,
        isDone,
      },
      { new: true }
    );

    if (!updatedStudyPlan) {
      return res.status(500).send({
        success: false,
        message: 'Can not update study plan now. Try again after sometime.',
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Study plan updated successfully.',
      data: updatedStudyPlan,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const getAllStudyPlans = async (req, res) => {
  try {
    const studyPlans = await StudyPlan.find({ userId: req?.user?._id });

    if (!studyPlans?.length) {
      return res
        .status(404)
        .send({ success: false, message: 'Study plans not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Study plans found successfully.',
      data: studyPlans,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const getStudyPlanById = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({
      _id: req?.params?.studyPlanId,
      userId: req?.user?._id,
    });

    if (!studyPlan) {
      return res
        .status(404)
        .send({ success: false, message: 'Study plan not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Study plan found successfully.',
      data: studyPlan,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const studyPlanToDoList = async (req, res) => {
  try {
    const sorting = req?.query?.sorting;

    const studyPlans = await StudyPlan.find({
      userId: req?.user?._id,
      isDone: false,
    }).sort({ finishDate: sorting == 'asc' ? 1 : -1 });

    if (!studyPlans?.length) {
      return res
        .status(404)
        .send({ success: false, message: 'Study plans not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Study plans found successfully.',
      data: studyPlans,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

module.exports = {
  createStudyPlan,
  updateStudyPlan,
  getAllStudyPlans,
  getStudyPlanById,
  studyPlanToDoList,
};
