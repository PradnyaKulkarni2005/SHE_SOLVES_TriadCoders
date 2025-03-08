import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this is imported if the styles are in a separate file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
   <nav className='navbar'>
        <Link to='/' className='navbar-logo'>Her World</Link>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>

        <Link to='/' className='nav-link'>Home</Link>
        <Link to='/forum' className='nav-link'>Fem Forum</Link>
        <Link to='/share-business' className='nav-link'>Women Thrive</Link>
        <Link to='/news' className='nav-link'>Beyond Boudaries</Link>
        <Link to='/wonderland' className='nav-link'>Women's Wonderland</Link>
        <Link to='/laws' className='nav-link'>Fem Guard</Link>
      </div>
   </nav>
  );
}

export default Navbar;
