import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import ImageUploader from './components/ImageUploader';
import './App.css';

function App() {
  const [urlsObject, setUrlsObject] = useState({});

  return (
    <div className="App">
      <Header />
      <main>
        <div className='product-registration-panel'>
          <Form urlsObject={urlsObject} setUrlsObject={setUrlsObject} />
          <ImageUploader setUrlsObject={setUrlsObject} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
