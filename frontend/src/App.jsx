import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SpeechToTextPage from './components/SpeechToTextPage';
import TextToSpeechPage from './components/TextToSpeechPage';
import HistoryPage from './components/HistoryPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/speech-to-text" element={<SpeechToTextPage />} />
          <Route path="/text-to-speech" element={<TextToSpeechPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;