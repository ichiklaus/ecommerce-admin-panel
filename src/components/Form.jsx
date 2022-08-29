import React from 'react';
import { useForm } from 'react-hook-form';
// import axios from 'axios';

import './Form.css';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    // TODO: FIX AXIOS POST REQUEST
    // try {
    //   const response = await axios.post(
    //     'http://127.0.0.1:5000/api/ecommerce-products/',
    //     JSON.stringify(data),
    //     {
    //       headers: { Accept: 'application/json', 'Content-Type': 'text/json' },
    //     },
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.response);
    // }

    fetch('http://127.0.0.1:5000/api/ecommerce-products/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(data),
    }).then((response) => {
      //do something awesome that makes the world a better place
      console.log("data uploaded: " + response.data)
    })
    .catch(error => console.log(error.response));
  };
  const handleError = (errors) => {};

  const registerValidation = {
    'product-brand': { required: "The product brand's name is required." },
    'product-name': { required: "The product's name is required." },
    'product-description': { required: 'A description is required.' },
    'product-price': {
      required: 'This field is required.',
      pattern: {
        value: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        message: 'Invalid value.',
      },
    },
    'product-discount': {
      required: 'This field is required.',
      pattern: {
        value: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        message: 'Invalid value.',
      },
    },
    'product-retail-price': {
      required: 'This field is required.',
      pattern: {
        value: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        message: 'Invalid value.',
      },
    },
  };

  // TODO: ADD PRODUCT COMPOSITION FIELD
  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div id="product-main-info">
          <div className="col-2">
            <div id="product-brand-field" className="field-block">
              <label htmlFor="product-brand">Brand</label>
              <input
                name="product-brand"
                type="text"
                placeholder="e.g. sneaker company"
                {...register(
                  'product-brand',
                  registerValidation['product-brand'],
                )}
              />
              <small>
                {errors?.['product-brand'] && errors['product-brand'].message}
              </small>
            </div>
            <div id="product-name-field" className="field-block">
              <label htmlFor="product-name">Name</label>
              <input
                name="product-name"
                type="text"
                placeholder="e.g. fall limited edition sneakers"
                {...register(
                  'product-name',
                  registerValidation['product-name'],
                )}
              />
              <small>
                {errors?.['product-name'] && errors['product-name'].message}
              </small>
            </div>
          </div>
          <div id="product-description-field" className="field-block full">
            <label htmlFor="product-description">Description</label>
            <input
              name="product-description"
              type="area"
              placeholder="e.g. These low-profile sneakers are your perfect casual wear companion..."
              {...register(
                'product-description',
                registerValidation['product-description'],
              )}
            />
            <small>
              {errors?.['product-description'] &&
                errors['product-description'].message}
            </small>
          </div>
        </div>
        <div id="product-price-info">
          <div className="col-3">
            <div id="product-price-field" className="field-block">
              <input
                name="product-price"
                type="text"
                placeholder="Price"
                inputMode="numeric"
                {...register(
                  'product-price',
                  registerValidation['product-price'],
                )}
              />
              <small>
                {errors?.['product-price'] && errors['product-price'].message}
              </small>
            </div>
            <div id="product-discount-field" className="field-block">
              <input
                name="product-discount"
                type="text"
                placeholder="Discount"
                {...register(
                  'product-discount',
                  registerValidation['product-discount'],
                )}
              />
              <small>
                {errors?.['product-discount'] &&
                  errors['product-discount'].message}
              </small>
            </div>
            <div id="product-retail-price-field" className="field-block">
              <input
                name="product-retail-price"
                type="text"
                placeholder="Retail Price"
                {...register(
                  'product-retail-price',
                  registerValidation['product-retail-price'],
                )}
              />
              <small>
                {errors?.['product-retail-price'] &&
                  errors['product-retail-price'].message}
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
