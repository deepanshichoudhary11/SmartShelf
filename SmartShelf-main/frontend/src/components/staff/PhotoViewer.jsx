import React from 'react';

const PhotoViewer = ({ url }) => {
  if (!url) return null;

  return (
    <div className="mt-2">
      <img src={url} alt="Shelf" className="w-32 h-32 object-cover rounded border" />
    </div>
  );
};

export default PhotoViewer;
