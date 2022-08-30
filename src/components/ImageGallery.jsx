import React from 'react';

import './ImageGallery.css'

const ImageGallery = ({ imageArray }) => {
  return (
    <div id="ImageGallery">
      {imageArray.map((previewImage) => {
        // TODO: Theres a bug that renders twice this log
        // console.log('data in the map', previewImage && previewImage.name);
        return (
          <img
            key={previewImage && previewImage.name}
            src={previewImage && URL.createObjectURL(previewImage)}
            alt={previewImage && previewImage.name}
            width="100%"
            height="auto"
          />
        );
      })}
    </div>
  );
};

export default ImageGallery;
