const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  timestamp: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  content: String
});

module.exports = mongoose.model('Message', MessageSchema);