import React from 'react';
import HeroGrid from './components/HeroGrid';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import NominateForm from './components/NominateForm';



function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top navigation bar */}
      <Navbar />
      <HeroSection/>

      

      {/* Main content */}
      <main className="flex-grow p-6">
        <HeroGrid />
        <NominateForm />
      </main>
      

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
