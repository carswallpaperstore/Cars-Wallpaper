import { useState } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import WallpaperGrid from './components/WallpaperGrid';
import Footer from './components/Footer';
import SchemaMarkup from './components/SchemaMarkup';
import { wallpapers } from './data/wallpapers';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app">
      <SchemaMarkup />
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <main className="main-content">
        <Filter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <WallpaperGrid 
          wallpapers={wallpapers} 
          activeCategory={activeCategory}
          searchTerm={searchTerm}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
