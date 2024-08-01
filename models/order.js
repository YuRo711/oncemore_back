const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  items: {
    type: Array,
    maxlength: 64,
    required: true,
    types: [{
      name: { type: ObjectId },
    }]
  },
});

module.exports = mongoose.model('order', orderSchema);
