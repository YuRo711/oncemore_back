const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const productSchema = new Schema({
  bitrixUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      }
    },
  },
});

module.exports = mongoose.model('product', productSchema);
