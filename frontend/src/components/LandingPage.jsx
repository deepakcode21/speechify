import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
   

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Transform Your Voice <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Into Possibilities
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience seamless speech-to-text and text-to-speech conversion with cutting-edge technology.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            onClick={() => navigate('/speech-to-text')}
          >
            Speech to Text
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            onClick={() => navigate('/text-to-speech')}
          >
            Text to Speech
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-indigo-600">🎙️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Speech to Text / Text to Speech
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instantly convert your voice into text and human-like speech from text with customizable voices and tones.
              </p>
            </div>

            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-blue-600">🌍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Multilingual
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Support for 50+ languages with automatic language detection and translation.
              </p>
            </div>

            {/* Feature 4 - Download Speech as .wav */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-green-600">💾</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Download Speech
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download the generated speech as a .wav file for offline use or further processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;