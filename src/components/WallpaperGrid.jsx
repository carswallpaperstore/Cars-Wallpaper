import React, { useState, useEffect, useRef } from 'react';
import WallpaperCard from './WallpaperCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/WallpaperGrid.css';

const WallpaperGrid = ({ wallpapers, activeCategory, searchTerm }) => {
  const [loading, setLoading] = useState(true);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const initialLoadDone = useRef(false);

  // Preload first few images immediately when component mounts
  useEffect(() => {
    if (!initialLoadDone.current) {
      // Preload first 6 images
      wallpapers.slice(0, 6).forEach(wallpaper => {
        const img = new Image();
        img.src = wallpaper.imageUrl;
        img.fetchPriority = 'high';
      });
      initialLoadDone.current = true;
    }
  }, [wallpapers]);

  useEffect(() => {
    // Apply filtering based on category and search term
    setLoading(true);
    
    // Immediate filtering for better UX
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
  }, [wallpapers, activeCategory, searchTerm]);

  // Handle image load event - persist loaded state
  const handleImageLoaded = (id) => {
    setLoadedImages(prev => {
      if (prev[id]) return prev; // Skip if already loaded
      return {
        ...prev,
        [id]: true
      };
    });
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
          {Array(6).fill(0).map((_, index) => (
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
              {filteredWallpapers.map((wallpaper, index) => (
                <WallpaperCard 
                  key={wallpaper.id} 
                  wallpaper={wallpaper} 
                  onImageLoad={() => handleImageLoaded(wallpaper.id)}
                  isLoaded={!!loadedImages[wallpaper.id]}
                  isPriority={index < 6} // Prioritize first 6 images
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