import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import styles from './Login.module.css';

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { signInUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    signInUser(data.email, data.password).then((authUser) => {
      router.push('/admin-dashboard');
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const handleError = (errors) => {};
  const registerValidation = {
    email: {
      required: 'Email required.',
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: 'Incorrect email format.',
      },
    },
    password: {
      required: 'Password required.',
    },
  };

  return (
    <div className={styles['container']}>
      <div className={styles['left-side']}>
        <Image
          priority
          src="/ecommerce-logo-transparent.png"
          alt="Picture of the author"
          width={200}
          height={162}
        />
        <h2 className={styles['subtitle']}>Ecommerce Shop</h2>
      </div>
      <div className={styles['right-side']}>
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className={styles['inputs-wrapper']}>
            <div id="email" className={styles[`field-block`]}>
              <input
                name="email"
                type="text"
                placeholder="Email"
                {...register('email', registerValidation['email'])}
              />
              <small className={styles[`error-message`]}>
                {errors?.['email'] && errors['email'].message}
              </small>
            </div>
            <div id="password" className={styles[`field-block`]}>
              <input
                name="password"
                type="password"
                placeholder="Password"
                {...register('password', registerValidation['password'])}
              />
              <small className={styles[`error-message`]}>
                {errors?.['password'] && errors['password'].message}
              </small>
            </div>
          </div>

          <div className={styles['login-button-wrapper']}>
            <button className={styles['login-button']} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
