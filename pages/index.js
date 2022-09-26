import React, { useState } from 'react';
import Form from '../src/components/Form';
import ImageUploader from '../src/components/ImageUploader';

export default function Home() {
  // const [urlsObject, setUrlsObject] = useState({});

  return (
    <div className="App">
      <div className='product-registration-panel'>
        <Form
        // urlsObject={urlsObject} setUrlsObject={setUrlsObject}
        />
        {/* <ImageUploader setUrlsObject={setUrlsObject} /> */}
      </div>
    </div>
  );
}
