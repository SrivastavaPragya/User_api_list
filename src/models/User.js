const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  customProperties: { type: Map, of: String }
});

// Create a unique index on the combination of email and listId
userSchema.index({ email: 1, listId: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
