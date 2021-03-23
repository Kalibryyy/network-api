const {
  celebrate,
  Joi
} = require('celebrate');
const validator = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(10000).required()
      .regex(/(^\S*)$/)
      .message('пробелы в пароле не допускаются'),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('в поле image должен быть валидный url-адрес');
    }),
  }),
});

const validateDeleteUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateDeleteUser,
};