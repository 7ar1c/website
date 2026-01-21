// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'leaflet/dist/leaflet.css'; // This fixes the map looking broken

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}