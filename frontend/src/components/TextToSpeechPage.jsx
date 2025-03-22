import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Load Available Voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Function to Speak & Record Audio
  const handleSpeak = () => {
    if (!text) {
      toast.warning('Please enter text to convert to speech.');
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    const selected = voices.find((voice) => voice.name === selectedVoice);
    if (selected) {
      speech.voice = selected;
    }

    speech.lang = selected ? selected.lang : "en-US";
    speech.volume = 1;
    speech.rate = speed;
    speech.pitch = pitch;

    speech.onstart = () => {
      setIsSpeaking(true);
      startRecording();
    };
    speech.onend = () => {
      setIsSpeaking(false);
      stopRecording();
    };

    window.speechSynthesis.speak(speech);
  };

  // Start Recording Audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
  };

  // Stop Recording & Prepare Download
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };
    }
  };

  // Stop Speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    stopRecording();
  };

  // Clear Text
  const handleClear = () => {
    setText("");
    handleStop();
  };

  const saveText = async () => {
    if (!title.trim() || !text.trim()) {
      toast.warning('Please enter a title and ensure text is provided.');
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/speech/save`, { title, text, language: selectedVoice.lang, voice: selectedVoice.name });
      toast.success('Speech saved successfully!');
      navigate('/history');
    } catch (error) {
      console.error('Error saving speech:', error);
      toast.error('Failed to save speech.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-5 space-y-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Text to Speech
        </h1>

        {/* Title Input */}
        <input
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          placeholder="Enter title to save speech"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Text Input */}
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Language Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Language</label>
          <div className="relative">
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none transition-all duration-200 hover:shadow-md"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {voices.map((voice, index) => (
                <option key={index} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Speed & Pitch Controls */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="text-gray-300">Speed: {speed.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
          <div>
            <label className="text-gray-300">Pitch: {pitch.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="p-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleSpeak}
            disabled={isSpeaking}
          >
            {isSpeaking ? "Speaking..." : "Speak"}
          </button>
          <button
            className="p-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="p-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={saveText}
          >
            Save
          </button>
        </div>

        {/* Download Audio Button */}
        {audioUrl && (
          <button
            className="w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => {
              const a = document.createElement('a');
              a.href = audioUrl;
              a.download = `text-to-speech-${Date.now()}.mp3`;
              a.click();
              URL.revokeObjectURL(audioUrl);
              toast.info('Audio download started!');
            }}
          >
            Download Audio
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;