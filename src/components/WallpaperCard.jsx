import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { saveAs } from 'file-saver';
import '../styles/WallpaperCard.css';

const WallpaperCard = ({ wallpaper, onImageLoad, isLoaded }) => {
  const [imageLoading, setImageLoading] = useState(true);
  
  const handleDownload = (e) => {
    // Prevent default behavior (opening in new tab)
    e.preventDefault();
    
    // Use file-saver to handle the download
    // This works better with cross-origin resources
    const fileName = `${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    
    // Fetch the image first to handle potential CORS issues
    fetch(wallpaper.downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, fileName);
      })
      .catch(error => {
        console.error('Download failed:', error);
        // Fallback to direct download if fetch fails
        saveAs(wallpaper.downloadUrl, fileName);
      });
  };
  
  const handleImageLoad = () => {
    setImageLoading(false);
    if (onImageLoad) onImageLoad();
  };

  // Create detailed alt text for better SEO
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
          src={wallpaper.imageUrl} 
          alt={altText} 
          className={`wallpaper-image ${imageLoading ? 'loading' : 'loaded'}`} 
          loading="lazy"
          onLoad={handleImageLoad}
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