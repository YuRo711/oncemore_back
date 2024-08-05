const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const categotySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('category', categotySchema);
