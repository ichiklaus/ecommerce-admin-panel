import React from 'react';
import { useForm } from 'react-hook-form';
// import axios from 'axios';

import './Form.css';

const API_URL = `http://127.0.0.1:5000/api/ecommerce-articles/`;

const Form = ({ urlsObject, setUrlsObject }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data['article-discount'] === '') data['article-discount'] = '0';
    if (data['article-size'] === '') data['article-size'] = 'Not specified.';
    // Adds the absolute path of the images uploaded to the body of JSON
    data['article-images-path'] = urlsObject;
    console.log(urlsObject);
    console.log(JSON.stringify(data));

    // TODO: Image upload code

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // If response was ok, clear the Urls Object
      if (response.ok) setUrlsObject(() => ({}));
    } catch (error) {
      console.log(error.response);
    }

    // TODO: FIX AXIOS POST REQUEST
    // try {
    //   const response = await axios.post(
    //     'http://127.0.0.1:5000/api/ecommerce-articles/',
    //     JSON.stringify(data),
    //     {
    //       headers: { Accept: 'application/json', 'Content-Type': 'text/json' },
    //     },
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.response);
    // }
  };
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
    'article-composition': { required: "Article's composition is required." },
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

  // TODO: ADD article COMPOSITION FIELD
  return (
    <div id="Form">
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div id="article-main-info">
          <div className="col-2">
            <div id="article-brand-field" className="field-block">
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
              <small className="error-message">
                {errors?.['article-brand'] && errors['article-brand'].message}
              </small>
            </div>
            <div id="article-name-field" className="field-block">
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
              <small className="error-message">
                {errors?.['article-name'] && errors['article-name'].message}
              </small>
            </div>
          </div>
          <div id="article-number-field" className="field-block full">
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
            <small className="error-message">
              {errors?.['article-number'] && errors['article-number'].message}
            </small>
          </div>
          <div id="article-description-field" className="field-block full">
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
            <small className="error-message">
              {errors?.['article-description'] &&
                errors['article-description'].message}
            </small>
          </div>
          <div id="article-composition-field" className="field-block full">
            <label htmlFor="article-composition">Composition</label>
            <input
              name="article-composition"
              type="text"
              placeholder="e.g. Shell: Cotton 98%, Spandex 2%; Pocket lining: Cotton 100% (separate by semicolon)."
              {...register(
                'article-composition',
                registerValidation['article-composition'],
              )}
            />
            <small className="error-message">
              {errors?.['article-composition'] &&
                errors['article-composition'].message}
            </small>
          </div>
          <div id="article-size-field" className="field-block full">
            <label htmlFor="article-size">Article's size</label>
            <input
              name="article-size"
              type="text"
              placeholder="e.g. Sole: 35 EUR"
              {...register('article-size')}
            />
          </div>
        </div>
        <div id="article-price-info">
          <div className="col-3">
            <div id="article-retail-price-field" className="field-block">
              <input
                name="article-retail-price"
                type="text"
                placeholder="Retail Price"
                {...register(
                  'article-retail-price',
                  registerValidation['article-retail-price'],
                )}
              />
              <small className="error-message">
                {errors?.['article-retail-price'] &&
                  errors['article-retail-price'].message}
              </small>
            </div>
            <div id="article-discount-field" className="field-block">
              <input
                name="article-discount"
                type="text"
                placeholder="Discount"
                {...register(
                  'article-discount',
                  registerValidation['article-discount'],
                )}
              />
              <small className="error-message">
                {errors?.['article-discount'] &&
                  errors['article-discount'].message}
              </small>
            </div>
          </div>
        </div>
        <div id="form-cta" className="cta-wrapper">
          {/* <input type="submit" /> */}
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
