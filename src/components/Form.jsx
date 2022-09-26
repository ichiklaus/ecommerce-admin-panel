import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FileUploader from './FileUploader';

import styles from './Form.module.css';
import { useState } from 'react';

const API_URL = `http://127.0.0.1:5000/api/ecommerce-articles/`;

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const [imageArray, setImageArray] = useState([]);
  const [urlsObject, setUrlsObject] = useState({});

  const onSubmit = async (data) => {
    data['article-images-path'] = urlsObject;
    if (data['article-discount'] === '') data['article-discount'] = '0';
    if (data['article-size'] === '') data['article-size'] = 'Not specified.';
    console.log(urlsObject);
    console.log(JSON.stringify(data));
    // ********************************************************************************************
    try {
      const response = await axios({
        method: 'POST',
        url: API_URL,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
      });
      console.log(response.data);
      if (response.ok) {
        setUrlsObject(() => ({}));
        setImageArray(() => []);
        console.log('after submit: ', urlsObject);
        console.log('after submit: ', imageArray);
        data = {};
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  // **************************************************************
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setUrlsObject(() => ({}));
      setImageArray(() => []);
      reset();
    }
  }, [formState, reset]);

  const handleError = (errors) => {};

  const registerValidation = {
    'article-brand': { required: "Article brand's name is required." },
    'article-name': { required: "Article's name is required." },
    'article-number': {
      required: "Article's number is required.",
      pattern: {
        value: /^[0-9]+$/g,
        message: 'Invalid format. Only numbers.',
      },
    },
    'article-description': { required: 'A description is required.' },
    'article-section-gender': { required: 'Field is required.' },
    'article-retail-price': {
      required: 'This field is required.',
      pattern: {
        value: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        message: 'Invalid value.',
      },
    },
    'article-discount': {
      pattern: {
        value: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        message: 'Invalid value.',
      },
    },
  };

  const [popup, isPopup] = useState(false);

  function openPopup() {
    console.log(popup);
    isPopup(() => !popup);
  }

  // TODO: ADD article COMPOSITION FIELD
  return (
    <div id="Form" className={styles[`container`]}>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div id="article-main-info">
          <div className={styles[`col-2`]}>
            <div id="article-brand-field" className={styles[`field-block`]}>
              <label htmlFor="article-brand">Brand</label>
              <input
                name="article-brand"
                type="text"
                placeholder="e.g. sneaker company"
                {...register(
                  'article-brand',
                  registerValidation['article-brand'],
                )}
              />
              <small className={styles[`error-message`]}>
                {errors?.['article-brand'] && errors['article-brand'].message}
              </small>
            </div>
            <div id="article-name-field" className={styles[`field-block`]}>
              <label htmlFor="article-name">Name</label>
              <input
                name="article-name"
                type="text"
                placeholder="e.g. fall limited edition sneakers"
                {...register(
                  'article-name',
                  registerValidation['article-name'],
                )}
              />
              <small className={styles[`error-message`]}>
                {errors?.['article-name'] && errors['article-name'].message}
              </small>
            </div>
          </div>
          <div
            id="article-number-field"
            className={`${styles['field-block']} ${styles['full']}`}
          >
            <label htmlFor="article-number">Article No.</label>
            <input
              name="article-number"
              type="text"
              placeholder="e.g. 1106189001"
              {...register(
                'article-number',
                registerValidation['article-number'],
              )}
            />
            <small className={styles[`error-message`]}>
              {errors?.['article-number'] && errors['article-number'].message}
            </small>
          </div>
          <div
            id="article-description-field"
            className={`${styles['field-block']} ${styles['full']}`}
          >
            <label htmlFor="article-description">Description</label>
            <input
              name="article-description"
              type="textarea"
              rows="10"
              placeholder="e.g. These low-profile sneakers are your perfect casual wear companion..."
              {...register(
                'article-description',
                registerValidation['article-description'],
              )}
            />
            <small className={styles[`error-message`]}>
              {errors?.['article-description'] &&
                errors['article-description'].message}
            </small>
          </div>
          <div
            id="article-composition-field"
            className={`${styles['field-block']} ${styles['full']}`}
          >
            <label htmlFor="article-composition">Composition</label>
            <input
              name="article-composition"
              type="text"
              placeholder="e.g. Shell: Cotton 98%, Spandex 2%; Pocket lining: Cotton 100% (separate by semicolon)."
              {...register('article-composition')}
            />
          </div>
          <div id="article-section-field" className={styles[`field-block`]}>
            <label htmlFor="article-gender-section">Section</label>
            <select
              name="article-gender-section"
              id="article-gender-section"
              {...register(
                'article-gender-section',
                registerValidation['article-gender-section'],
              )}
            >
              <option value="Other">Other</option>
              <option value="Women">Female</option>
              <option value="Men">Male</option>
            </select>
            <small className={styles[`error-message`]}>
              {errors?.['article-gender-section'] &&
                errors['article-gender-section'].message}
            </small>
          </div>
          <div
            id="article-size-field"
            className={`${styles['field-block']} ${styles['full']}`}
          >
            <label htmlFor="article-size">Article's size</label>
            <input
              name="article-size"
              type="text"
              placeholder="e.g. 4; 6; 8 (separate by semicolon)"
              {...register('article-size')}
            />
          </div>
        </div>
        <div id="article-price-info">
          <div className={styles[`col-2`]}>
            <div
              id="article-retail-price-field"
              className={styles[`field-block`]}
            >
              <input
                name="article-retail-price"
                type="text"
                placeholder="Retail Price"
                {...register(
                  'article-retail-price',
                  registerValidation['article-retail-price'],
                )}
              />
              <small className={styles[`error-message`]}>
                {errors?.['article-retail-price'] &&
                  errors['article-retail-price'].message}
              </small>
            </div>
            <div id="article-discount-field" className={styles[`field-block`]}>
              <input
                name="article-discount"
                type="text"
                placeholder="Discount"
                {...register(
                  'article-discount',
                  registerValidation['article-discount'],
                )}
              />
              <small className={styles[`error-message`]}>
                {errors?.['article-discount'] &&
                  errors['article-discount'].message}
              </small>
            </div>
          </div>
        </div>

        <FileUploader
          popup={popup}
          isPopup={isPopup}
          imageArray={imageArray}
          setImageArray={setImageArray}
          setUrlsObject={setUrlsObject}
        />
        <div
          id="upload-popup-button"
          className={styles['upload-popup-button-wrapper']}
        >
          <i onClick={openPopup}>Upload files</i>
        </div>

        <div id="form-cta" className={styles[`cta-wrapper`]}>
          {/* <input type="submit" /> */}
          <button className={styles['register-button-wrapper']} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
