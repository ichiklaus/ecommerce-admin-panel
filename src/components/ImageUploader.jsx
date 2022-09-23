import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '../firebase';
import ImageGallery from './ImageGallery';

import styles from './ImageUploader.module.css';

export default function ImageUploader({ setUrlsObject }) {
  const [imageArray, setImageArray] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    imageArray.map((imageBlob) => {
      let imageName = imageBlob.name;
      const imagesRef = ref(storage, `article-images/${imageName}`);
      // Upload Task
      const uploadTask = uploadBytesResumable(imagesRef, imageBlob);

      return uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log("User doesn't have permission to access the object");
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log(
                'Unknown error occurred, inspect error.serverResponse',
              );
              break;
            default:
              console.log('Unknown');
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUrlsObject((prevState) => ({
              ...prevState,
              [imageName]: downloadURL,
            }));
          });
        },
      );
    });
  };

  return (
    <div id="ImageUploader" className={styles['image-uploader']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles[`input-file-wrapper`]}>
          <label htmlFor="picture">Upload your images: </label>
          <input
            type="file"
            name="picture"
            id="picture"
            {...register('picture', {
              onChange: (e) => {
                setImageArray((prev) => [...prev, e.target.files[0]]);
              },
            })}
          />
        </div>
        <button type="submit">Upload all</button>
      </form>
      <ImageGallery imageArray={imageArray} />
    </div>
  );
}
