const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    select: false,
  },
  product: {
    type: ObjectId,
    required: true,
    select: false,
  },
  video: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      }
    },
  },
  text: {
    type: String,
    maxlength: 512,
  },
});

module.exports = mongoose.model('review', reviewSchema);
