const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    types: [{
      name: { type: String },
    }],
    default: []
  },
  colorImages: {
    type: Array,
    types: [{
      name: { type: String },
    }],
    default: []
  },
  products: {
    type: Array,
    types: [{
      name: { type: ObjectId },
    }],
    default: []
  },
});

module.exports = mongoose.model('productType', productTypeSchema);
