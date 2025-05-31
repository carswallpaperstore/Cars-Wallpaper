import { useState, useEffect } from 'react';
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

  // Preload critical images as soon as the app loads
  useEffect(() => {
    // Preload the first 3 images immediately
    const preloadTopImages = () => {
      wallpapers.slice(0, 3).forEach(wallpaper => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = wallpaper.imageUrl;
        link.fetchpriority = 'high';
        document.head.appendChild(link);
      });
    };
    
    preloadTopImages();
  }, []);

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
