import React from 'react';
import { useForm } from 'react-hook-form';
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '../firebase/conn';

import ImageGallery from './ImageGallery';
import { handleUploadFiles } from '../utils';

import styles from './FileUploader.module.css';

export default function FileUploader({
  setUrlsObject,
  popup,
  isPopup,
  setIsUploaded,
  imageArray,
  setImageArray,
}) {
  const { register } = useForm();

  const nextStep = () => {
    imageArray.map((imageBlob) => {
      let imageName = imageBlob.name;
      const imagesRef = ref(storage, `article-images/${imageName}`);
      let progressArr = [];
      let sumProgress = 0;

      // Upload Task
      const uploadTask = uploadBytesResumable(imagesRef, imageBlob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          if (progress === 100) progressArr.push(progress);

          sumProgress = progressArr.reduce((prev, curr) => prev + curr, 0);
          sumProgress = sumProgress / progressArr.length;
          if (sumProgress === 100) {
            alert('File has been uploaded successfully.');
            isPopup(() => !popup);
            // setIsUploaded(() => true);
          } else console.log('An error ocurred while uploading.');
          // progress == 100 && isPopup(() => !popup);
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
            setUrlsObject((prevState) => ({
              ...prevState,
              [imageName]: downloadURL,
            }));
            console.log('File available at', downloadURL);
          });
        },
      );
    });
  };

  function cancel() {
    isPopup(() => !popup);
  }

  return (
    <div
      className={`${styles.modal} ${popup ? styles.visible : styles.invisible}`}
    >
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={cancel}>
          &times;
        </span>
        <div className={styles['file-uploader-container']}>
          <ImageGallery imageArray={imageArray} setImageArray={setImageArray} />
          <div className={styles['action-container']}>
            <div className={styles[`input-file-wrapper`]}>
              <div>
                <label className={styles['button']} htmlFor="upload-picture">
                  Select images
                </label>
                <input
                  multiple
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  type="file"
                  name="upload-picture"
                  id="upload-picture"
                  {...register('upload-picture', {
                    // onChange: (e) => {
                    //   setImageArray((prev) => [...prev, e.target.files[0]]);
                    // },
                    onChange: (event) => {
                      const chosenFiles = Array.prototype.slice.call(
                        event.target.files,
                      );
                      handleUploadFiles(
                        chosenFiles,
                        [...imageArray],
                        setImageArray,
                      );
                      event.target.value = '';
                    },
                  })}
                />
              </div>
            </div>
            <div className={styles['action-wrapper']}>
              <span
                className={`${styles['button']} ${styles['continue']}`}
                onClick={nextStep}
              >
                Continue
              </span>
              <span
                className={`${styles['button']} ${styles['cancel']}`}
                onClick={cancel}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
