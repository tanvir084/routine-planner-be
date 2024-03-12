const db = require('../models');
const { format, addDays } = require('date-fns');
const { generatedPlannerValidation } = require('../validation');

const StudyPlan = db.studyPlan;
const Schedule = db.schedule;
const GeneratedPlanner = db.generatedPlanner;

const time = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const generateStudyPlanner = async (req, res) => {
  try {
    const { title, day, priorityDuration } = req?.body ?? {};

    // VALIDATE THE DATA BEFORE CREATING OPTIMIZED STUDY PLAN
    const { error } = generatedPlannerValidation({
      title,
      day,
    });

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    // Get the current date
    const currentDate = new Date();

    // Format the current date
    const formattedDates = [format(currentDate, 'yyyy/MM/dd')];

    // Format the future date
    for (let i = 1; i < day; i++) {
      const futureDate = addDays(currentDate, i);
      formattedDates.push(format(futureDate, 'yyyy/MM/dd'));
    }

    const schedule = await Schedule.find({
      isDone: false,
      date: { $gte: formattedDates[0] },
    })
      .sort({ date: 1 })
      .lean();

    let studyPlan = [];

    if (priorityDuration) {
      studyPlan = await StudyPlan.find({
        isDone: false,
      })
        .sort({ duration: -1 })
        .lean();
    } else {
      studyPlan = await StudyPlan.find({
        isDone: false,
      })
        .sort({ priority: -1 })
        .lean();
    }

    const generatedPlanner = [];
    let count = 1;

    /*
      Algorithm (Generated Study Planner):
      - Need to check all the study plan
      - Run all the time slot & upcoming days slot
      - Check if the slot is not in the class & job time 
    */

    for (let i = 0; i < studyPlan?.length; i++) {
      for (let l = 0; l < formattedDates?.length; l++) {
        for (let j = 0; j < time?.length; j++) {
          const hour = Math.ceil(studyPlan[i]?.duration / 60);
          const endIndex = (j + hour) % 24;
          let available = true;
          for (let k = 0; k < schedule?.length; k++) {
            // Check if the slot is not in the class & job time
            if (
              time[j] >= schedule[k]?.startTime &&
              time[j] <= schedule[k]?.endTime &&
              formattedDates[l] == schedule[k]?.date
            ) {
              available = false;
            } else if (
              time[endIndex] >= schedule[k]?.startTime &&
              time[endIndex] <= schedule[k]?.endTime &&
              formattedDates[l] == schedule[k]?.date
            ) {
              available = false;
            }
          }

          // If the slot is available then add it in generated planner & go to next study plan
          if (available && i < studyPlan?.length) {
            generatedPlanner.push({
              ...studyPlan[i],
              date: formattedDates[l],
              startTime: time[j],
              endTime: time[endIndex],
              serial: count++,
            });
            if (endIndex > j) {
              j = endIndex;
            } else {
              j = time?.length;
            }
            i++;
          }
        }
      }
    }

    const createGenenratedPlanner = await GeneratedPlanner.create({
      userId: String(req?.user?._id),
      title,
      date: formattedDates[0],
      day,
      generatedPlanner,
    });

    return res.status(201).send({
      success: true,
      message: 'Generated study plan created successfully.',
      data: createGenenratedPlanner,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const getAllGenerateStudyPlanner = async (req, res) => {
  try {
    const generatedPlanners = await GeneratedPlanner.find({
      userId: req?.user?._id,
    });

    if (!generatedPlanners?.length) {
      return res
        .status(404)
        .send({ success: false, message: 'Generated planners not found.' });
    }

    return res.status(201).send({
      success: true,
      message: 'Generated planners found successfully.',
      data: generatedPlanners,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const doneCertainPlan = async (req, res) => {
  try {
    const generatedPlannerId = req?.params?.generatedPlannerId;
    const { serial } = req?.body ?? {};

    const findGeneratedPlanner = await GeneratedPlanner.findOne({
      _id: generatedPlannerId,
      userId: String(req?.user?._id),
    }).lean();

    if (!findGeneratedPlanner) {
      return res
        .status(404)
        .send({ success: false, message: 'Generated planner not found.' });
    }

    if (serial <= findGeneratedPlanner?.generatedPlanner?.length) {
      findGeneratedPlanner.generatedPlanner[serial - 1].isDone = true;

      // Update the study plan done
      await StudyPlan.findByIdAndUpdate(
        findGeneratedPlanner.generatedPlanner[serial - 1]._id,
        {
          isDone: true,
        }
      );

      // Update generated planner 
      const updateGeneratePlanner = await GeneratedPlanner.findByIdAndUpdate(
        generatedPlannerId,
        {
          generatedPlanner: findGeneratedPlanner?.generatedPlanner,
        },
        { new: true }
      );

      if (!updateGeneratePlanner) {
        return res.status(500).send({
          success: false,
          message:
            'Can not update generated planner now. Try again after sometime.',
        });
      }

      return res.status(201).send({
        success: true,
        message: 'Generated planner updated successfully.',
        data: updateGeneratePlanner,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'Serial must be less then generated planner to-do list.',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

module.exports = {
  generateStudyPlanner,
  getAllGenerateStudyPlanner,
  doneCertainPlan,
};
