const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
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
    handle: {
      type: String,
      minlength: 2,
      maxlength: 32,
      unique: true,
    },
    avatar: {
      type: String,
      validate: {
        validator(value) {
          return validator.isURL(value);
        }
      },
      default: "",
    },
    privilege: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
});

module.exports = mongoose.model('user', userSchema);
