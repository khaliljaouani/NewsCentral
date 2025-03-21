import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: Object,
  searchParams: Object,
  viewedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ArticleHistory', historySchema);