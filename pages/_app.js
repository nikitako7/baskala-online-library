import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp);
