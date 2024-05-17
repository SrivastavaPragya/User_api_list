const mongoose = require('mongoose');

const customPropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  fallbackValue: { type: String, required: true }
});

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  customProperties: [customPropertySchema]
});

module.exports = mongoose.model('List', listSchema);
