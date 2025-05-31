import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { saveAs } from 'file-saver';
import '../styles/WallpaperCard.css';

const WallpaperCard = ({ wallpaper, onImageLoad, isLoaded, isPriority = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef(null);
  const hasLoadedRef = useRef(false); // Track if this image has ever been loaded
  
  // Preload image and cache it
  useEffect(() => {
    // Skip if already loaded
    if (hasLoadedRef.current) return;
    
    const img = new Image();
    img.src = wallpaper.imageUrl;
    
    // Add cache control headers
    const controller = new AbortController();
    fetch(wallpaper.imageUrl, {
      signal: controller.signal,
      cache: 'force-cache', // Force browser to use cached version if available
      headers: {
        'Cache-Control': 'max-age=31536000', // Cache for 1 year
      }
    }).catch(() => {}); // Ignore fetch errors, this is just for caching
    
    img.onload = () => {
      if (isPriority || imageRef.current?.complete) {
        setImageLoading(false);
        hasLoadedRef.current = true;
        if (onImageLoad) onImageLoad();
      }
    };
    
    return () => controller.abort();
  }, [wallpaper.imageUrl, isPriority, onImageLoad]);
  
  const handleDownload = (e) => {
    e.preventDefault();
    const fileName = `${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    
    fetch(wallpaper.downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, fileName);
      })
      .catch(error => {
        console.error('Download failed:', error);
        saveAs(wallpaper.downloadUrl, fileName);
      });
  };
  
  const handleImageLoad = () => {
    setImageLoading(false);
    hasLoadedRef.current = true;
    if (onImageLoad) onImageLoad();
  };

  const altText = `${wallpaper.title} - ${wallpaper.category} car wallpaper in high resolution`;

  return (
    <div className={`wallpaper-card ${!isLoaded ? 'loading' : ''}`}>
      <div className="wallpaper-image-container">
        {imageLoading && (
          <div className="skeleton-container">
            <Skeleton 
              height="100%" 
              width="100%" 
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
            />
          </div>
        )}
        <img 
          ref={imageRef}
          src={wallpaper.imageUrl} 
          alt={altText} 
          className={`wallpaper-image ${imageLoading ? 'loading' : 'loaded'}`} 
          loading={isPriority ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          fetchpriority={isPriority ? 'high' : 'auto'}
          decoding={isPriority ? 'sync' : 'async'}
        />
      </div>
      <div className="wallpaper-details">
        <h3>{wallpaper.title}</h3>
        {wallpaper.description && <p className="wallpaper-description">{wallpaper.description}</p>}
        <div className="card-actions">
          <span className="category-tag">{wallpaper.category}</span>
          {wallpaper.resolution && <span className="resolution-tag">{wallpaper.resolution}</span>}
          <button 
            className="download-button" 
            onClick={handleDownload}
            aria-label={`Download ${wallpaper.title} wallpaper`}
          >
            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;