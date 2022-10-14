import React from 'react';
import Layout from '../src/components/Layout';
import { AuthUserProvider } from '../src/context/authContext';
import '../src/index.css';
import 'normalize.css/normalize.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Layout>
  );
}
