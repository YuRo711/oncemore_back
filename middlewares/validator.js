const { celebrate, Joi } = require('celebrate');
const validator = require('validator');


const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.notemail');
}

const validatePhone = (value, helpers) => {
  if (value.startsWith("+7") && value.length == 12) {
    return value;
  }
  return helpers.error('string.notphone');
}


module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 32',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.notemail": 'the "email" field must be a valid email',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),

    handle: Joi.string().messages({
      "string.min": 'The minimum length of the "handle" field is 2',
      "string.max": 'The maximum length of the "handle" field is 32',
    }),

    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),

    phone: Joi.string().custom(validatePhone).messages({
      "string.empty": 'The "phone" field must be filled in',
      "string.notphone": 'the "avatar" field must be a valid phone number',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.notemail": 'the "email" field must be a valid email',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateReview = celebrate({
  body: Joi.object().keys({
    video: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "video" field must be a valid url',
      "string.empty": 'The "video" field must be filled in',
    }),
  }),
});