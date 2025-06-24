import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroGrid from './components/HeroGrid';
import NominateForm from './components/NominateForm';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/heroes" element={<HeroGrid />} />
          <Route path="/nominate" element={<NominateForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
