import "@/styles/common/globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head><title>Behind my Nike shoes</title></Head>
      <link rel="stylesheet" href="https://use.typekit.net/hmm3juy.css" />
      <Component {...pageProps} />
    </>
  );
}
