import React from 'react';
import Layout from '../src/components/Layout';
import '../src/index.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
