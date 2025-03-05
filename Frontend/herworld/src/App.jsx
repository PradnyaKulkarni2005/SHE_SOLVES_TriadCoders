import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Navbar from './Components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login'; // Ensure Login component is imported
import BeyondBoundaries from './pages/BeyondBoundaries';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} /> {/* Ensure Login route is correct */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<BeyondBoundaries />} />
      </Routes>
    </Router>
  );
}

export default App;