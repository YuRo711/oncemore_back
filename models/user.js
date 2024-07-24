const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        }
      },
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
      type: String,
      validate: {
        validator(value) {
          return validator.isURL(value);
        }
      },
      select: false,
    },
});

module.exports = mongoose.model('user', userSchema);
