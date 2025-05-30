import React from 'react';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Car Wallpapers</h1>
        <p>High-quality wallpapers for car enthusiasts</p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </header>
  );
};

export default Header;