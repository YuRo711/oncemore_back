const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
  },
  product: {
    type: ObjectId,
    required: true,
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
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('review', reviewSchema);
