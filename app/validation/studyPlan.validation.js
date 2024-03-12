const Joi = require('@hapi/joi');

//STUDYPLAN VALIDATION

const studyPlanValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().required(),
    priority: Joi.number().required(),
    learningPurpose: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  studyPlanValidation,
};
