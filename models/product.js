const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  photos: {
    type: Array,
    types: [{
      name: { 
        type: String,
        validate: {
          validator(value) {
            return validator.isURL(value);
          }
        }
      },
    }],
    default: [],
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
  brand: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
  color: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  composition: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  appliance: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
  },
  article: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
  },
  barcode: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  likes: {
    type: Array,
    types: [{
      name: { type: ObjectId },
    }],
    default: [],
  },
  type: {
    type: String,
    required: true,
  },
  colorImage: {
    type: String,
    default: "#000000",
  }
});

module.exports = mongoose.model('product', productSchema);
