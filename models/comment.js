const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    select: false,
  },
  review: {
    type: ObjectId,
    required: true,
    select: false,
  },
  text: {
    type: String,
    maxlength: 512,
  },
});

module.exports = mongoose.model('review', reviewSchema);
