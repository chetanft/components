import type { AppProps } from 'next/app';
import 'ft-design-system/styles.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

