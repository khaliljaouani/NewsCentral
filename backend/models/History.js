const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  article: {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    source: { type: String, required: true },
    publishedAt: { type: Date }
  },
  searchParams: {
    keyword: { type: String },
    category: { type: String },
    fromDate: { type: String },
    toDate: { type: String },
    source: { type: String }
  },
  consultedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('History', historySchema);
