import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextToSpeechPage = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('');
  const [voices, setVoices] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      setVoices(synth.getVoices());
    };
    synth.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleTextToSpeech = () => {
    if (!text.trim()) {
      toast.warning('Please enter text to convert to speech.');
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.voice = voices.find(v => v.name === voice) || null;

    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const destination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);

    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setAudioBlob(blob); 
      toast.success('Audio generated successfully!');
    };

    const source = audioContext.createMediaStreamSource(destination.stream);
    source.connect(audioContext.destination);


    mediaRecorder.start();


    synth.speak(utterance);

 
    utterance.onend = () => {
      mediaRecorder.stop();
    };
  };

  const saveText = async () => {
    if (!title.trim() || !text.trim()) {
      toast.warning('Please enter a title and ensure text is provided.');
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/speech/save`, { title, text, language, voice });
      toast.success('Speech saved successfully!');
      navigate('/history');
    } catch (error) {
      console.error('Error saving speech:', error);
      toast.error('Failed to save speech.');
    }
  };

  const downloadAudio = () => {
    if (!audioBlob) {
      toast.warning('No audio available to download.');
      return;
    }

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-to-speech-${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
    toast.info('Audio download started!');
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Voice Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Voice</label>
          <div className="relative">
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none transition-all duration-200 hover:shadow-md"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              <option value="">Default Voice</option>
              {voices.map((v, index) => (
                <option key={index} value={v.name}>{v.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="p-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleTextToSpeech}
          >
            Speak
          </button>
          <button
            className="p-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={saveText}
          >
            Save
          </button>
        </div>

        {/* Download Audio Button */}
        {audioBlob && (
          <button
            className="w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={downloadAudio}
          >
            Download Audio
          </button>
        )}
      </div>
    </div>
  );
};

export default TextToSpeechPage;