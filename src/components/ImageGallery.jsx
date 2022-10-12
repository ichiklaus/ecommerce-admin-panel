import React from 'react';
import { handleUploadFiles } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './ImageGallery.module.css';

export default function ImageGallery({ imageArray, setImageArray }) {
  // console.log('in gallery', imageArray);
  const removeFileFromArray = (referenceName) => {
    let fileIndex = -1;
    if (referenceName !== '') {
      // If referenceName is not empty then get the index of that reference in the array
      fileIndex = imageArray.findIndex((file) => file.name === referenceName);
    }

    // Copy the new array after slicing the original array
    const slicedArray = [
      ...imageArray.slice(0, fileIndex),
      ...imageArray.slice(fileIndex + 1, imageArray.length),
    ];

    // Reuploads the new array
    handleUploadFiles(slicedArray, [], setImageArray);
  };

  // setTimeout(() => {
  //   fileRefProgress === 100 && setFileRefProgress(() => []);
  // }, 1000);

  return (
    <div id="ImageGallery" className={styles[`image-gallery`]}>
      {imageArray &&
        imageArray.map((previewImage, index) => {
          // TODO: Theres a bug that renders twice this log
          // console.log('data in the map', previewImage);
          // console.log(index);
          return (
            <div
              key={previewImage && previewImage.name}
              className={styles['image-wrapper']}
            >
              <img
                // key={previewImage && previewImage.name}
                src={previewImage && URL.createObjectURL(previewImage)}
                alt={previewImage && previewImage.name}
                width="100%"
                height="auto"
              />

              <div className={styles['image-overlay']}>
                <span
                  // key={previewImage && previewImage.name}
                  className={`${styles['image-icon']} ${styles['shake']}`}
                  onClick={() => {
                    setTimeout(() => {
                      removeFileFromArray(previewImage.name);
                    }, 100);
                  }}
                >
                  <FontAwesomeIcon
                    id={styles['trash-icon']}
                    icon={faTrash}
                    color="white"
                  />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
