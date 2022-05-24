import mongoose, { Schema } from 'mongoose';

const reportSchema = new mongoose.Schema({
  status: { type: String, required: true, enum: ['UP', 'DOWN'] },
  date: { type: Date, required: true, default: Date.now },
  response_time: { type: Number, required: true },
  check_id: { type: Schema.Types.ObjectId, ref: 'Check', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String },
  error_message: { type: String }
});

export const Report = mongoose.model('Report', reportSchema);