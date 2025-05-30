import React from 'react';

const SchemaMarkup = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Car Wallpapers",
    "url": "https://your-website-url.com",
    "description": "High-quality wallpapers for car enthusiasts",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://your-website-url.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Car Wallpapers Gallery",
    "description": "A collection of high-quality car wallpapers for enthusiasts",
    "mainEntity": {
      "@type": "ImageGallery",
      "name": "Car Wallpaper Collection",
      "description": "Browse our collection of high-resolution car wallpapers featuring sports cars, luxury vehicles, classics, muscle cars, SUVs, and electric vehicles."
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(imageGallerySchema)}
      </script>
    </>
  );
};

export default SchemaMarkup;