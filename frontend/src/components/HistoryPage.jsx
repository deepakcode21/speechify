import { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await axios.get(`${backendUrl}/api/speech/history`);
    setHistory(response.data);
  };

  const closeModal = () => {
    setSelectedSpeech(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Saved History</h1>
        <div className="grid grid-cols-1 gap-6">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedSpeech(item)}
              className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedSpeech && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSpeech.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selectedSpeech.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700">{selectedSpeech.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;