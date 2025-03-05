import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#f4f4f4' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/forum">Fem Forum</Link>
      <Link to="/">Women Thrive</Link>
      <Link to="/">Beyond Boundaries</Link>
      <Link to="/">Women Wonderland</Link>
    </nav>
  );
};

export default Navbar;