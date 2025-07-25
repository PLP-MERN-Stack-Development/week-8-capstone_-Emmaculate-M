import mongoose from 'mongoose';

const seizureSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  duration: { type: Number },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('SeizureLog', seizureSchema);
