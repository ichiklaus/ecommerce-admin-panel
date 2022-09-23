import { Html, Head, Main, NextScript } from 'next/document'
import Seo from '../src/components/Seo';

import config from '../config.json';

export default function Document() {
  const { title, sitetitle, description } = config;

  return (
    <Html>
      <Head>
        <Seo
          title={title}
          sitetitle={sitetitle}
          description={description}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}