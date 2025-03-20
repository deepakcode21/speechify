import mongoose from 'mongoose';

const speechSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  language: { type: String, required: true },
  voice: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Speech = mongoose.model('Speech', speechSchema);

export default Speech;