import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Car Wallpapers. All rights reserved.</p>
        <p>High-quality wallpapers for car enthusiasts</p>
      </div>
    </footer>
  );
};

export default Footer;