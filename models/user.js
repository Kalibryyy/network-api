const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: ({ value }) => `${value} - некорректный email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator(v) {
        return /(^\S*)$/i.test(v);
      },
      message: 'пробелы в пароле не допускаются',
    },
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
