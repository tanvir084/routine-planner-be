const Joi = require('@hapi/joi');

//SCHEDULE VALIDATION

const scheduleValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  scheduleValidation,
};
