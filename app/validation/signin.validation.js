const Joi = require('@hapi/joi');

//SIGN-IN VALIDATION

const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  signinValidation,
};
