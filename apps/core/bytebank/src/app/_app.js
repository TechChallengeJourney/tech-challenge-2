// pages/_app.js
import { useEffect } from 'react';
import { registerAllWebComponents } from '@bytebank/design-system';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    registerAllWebComponents();
  }, []);

  return <Component {...pageProps} />;
}