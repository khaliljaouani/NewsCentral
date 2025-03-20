const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: Object,
  searchParams: Object,
  viewedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);