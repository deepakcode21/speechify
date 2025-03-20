import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpeechToTextPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [isRecording, setIsRecording] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const navigate = useNavigate();
  let recognition;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition not supported in your browser.");
    }
  }, []);

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) return;

    recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.start();
  };

  const saveText = async () => {
    if (!title.trim() || !text.trim()) {
      toast.warning("Please enter a title and ensure speech is transcribed.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/speech/save`,
        { title, text, language }
      );
      setTitle("");
      setText("");
      setShowTitleInput(false);
      toast.success("Speech saved successfully!");
    } catch (error) {
      console.error("Error saving speech:", error);
      toast.error("Failed to save speech.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.info("Text copied to clipboard!"))
      .catch(() => toast.error("Failed to copy text."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-2xl bg-white mt-15 rounded-xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Speech to Text
        </h1>

        {/* Language Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Language
          </label>
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
              <svg
                className="w-4 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Recording Button */}
        <button
          className={`w-full p-2 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
            isRecording
              ? "bg-red-600 hover:bg-red-700 transform scale-105"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleSpeechToText}
        >
          {isRecording ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              Stop Recording
            </span>
          ) : (
            "Start Speaking"
          )}
        </button>

        {/* Transcribed Text */}
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
          placeholder="Your speech will appear here..."
          value={text}
          readOnly
        />

        {/* Conditionally Render Title Input */}
        {showTitleInput && (
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            placeholder="Enter title to save speech"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="p-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => {
              if (!showTitleInput) {
                setShowTitleInput(true);
              } else {
                saveText();
              }
            }}
          >
            Save Speech
          </button>
          <button
            className="p-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextPage;
