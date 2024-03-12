const Joi = require('@hapi/joi');

//GENERATED PLANNER VALIDATION

const generatedPlannerValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    day: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = {
  generatedPlannerValidation,
};
