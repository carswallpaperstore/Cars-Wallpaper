import React, { useState, useEffect } from 'react';
import WallpaperCard from './WallpaperCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/WallpaperGrid.css';

const WallpaperGrid = ({ wallpapers, activeCategory, searchTerm }) => {
  const [loading, setLoading] = useState(true);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    // Reset loaded images when filters change
    setLoadedImages({});
    
    // Apply filtering based on category and search term
    setLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = wallpapers;
      
      // Filter by category
      if (activeCategory !== 'all') {
        filtered = filtered.filter(wallpaper => wallpaper.category === activeCategory);
      }
      
      // Filter by search term
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(wallpaper => 
          wallpaper.title.toLowerCase().includes(searchLower) ||
          wallpaper.category.toLowerCase().includes(searchLower)
        );
      }
      
      setFilteredWallpapers(filtered);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [wallpapers, activeCategory, searchTerm]);

  // Handle image load event
  const handleImageLoaded = (id) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Skeleton loader component
  const WallpaperSkeleton = () => (
    <div className="wallpaper-card skeleton">
      <div className="wallpaper-image-container">
        <Skeleton height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      </div>
      <div className="wallpaper-details">
        <Skeleton height={24} width="80%" style={{ marginBottom: '1rem' }} />
        <Skeleton height={40} width="100%" />
      </div>
    </div>
  );

  return (
    <div className="wallpaper-grid-container">
      {loading ? (
        <div className="wallpaper-grid">
          {Array(12).fill(0).map((_, index) => (
            <WallpaperSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {filteredWallpapers.length === 0 ? (
            <div className="no-results">
              <h3>No wallpapers found</h3>
              <p>{searchTerm ? 'Try a different search term or' : ''} select another category</p>
            </div>
          ) : (
            <div className="wallpaper-grid">
              {filteredWallpapers.map(wallpaper => (
                <WallpaperCard 
                  key={wallpaper.id} 
                  wallpaper={wallpaper} 
                  onImageLoad={() => handleImageLoaded(wallpaper.id)}
                  isLoaded={!!loadedImages[wallpaper.id]}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WallpaperGrid;