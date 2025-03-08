import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Navbar from './Components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login'; // Ensure Login component is imported
import BeyondBoundaries from './pages/BeyondBoundaries';
import VideoGallery from './pages/VideoGallery';
import BusinessForm from './pages/BusinessForm';
import BusinessList from './Components/BusinessList';
import Preloader from './Components/Preloader.jsx';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <Router>
      {!showContent ? (
        <Preloader onComplete={() => setShowContent(true)} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/news" element={<BeyondBoundaries />} />
            <Route path="/wonderland" element={<VideoGallery />} />
            <Route path="/share-business" element={<BusinessForm />} />
            <Route path="/business-ideas" element={<BusinessList />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
