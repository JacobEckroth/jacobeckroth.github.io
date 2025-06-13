import React from 'react';
import "../css/PixelArtHolder.css"
const PixelArt = ({ imagePath, altText, dateCreated }) => {
  return (
    <div className="image-item">
    <img src={imagePath} alt={altText || 'image'} style={{ maxWidth: '100%' }} />
    <p className="image-date">{dateCreated}</p>
    </div>
  );
};

export default PixelArt;
