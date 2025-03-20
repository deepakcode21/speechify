import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/')}
          >
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Speechify
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              onClick={() => navigate('/speech-to-text')}
            >
              STT
            </button>
            <button
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              onClick={() => navigate('/text-to-speech')}
            >
              TTS
            </button>
            <button
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;