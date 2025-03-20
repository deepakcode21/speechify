import express from 'express';
import Speech from '../models/speech.js';

const router = express.Router();

// Save speech
router.post('/save', async (req, res) => {
  try {
    const { title, text, language, voice } = req.body;
    const newSpeech = new Speech({ title, text, language, voice });
    await newSpeech.save();
    res.status(201).json({ message: 'Speech saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save speech' });
  }
});

// Fetch saved speeches
router.get('/history', async (req, res) => {
  try {
    const speeches = await Speech.find().sort({ createdAt: -1 });
    res.json(speeches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export default router;
