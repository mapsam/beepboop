import '../styles/styles.sass'
import Layout from '../components/Layout.js';
import { Provider, useSession } from 'next-auth/client'
import Head from 'next/head';
// https://github.com/nextauthjs/next-auth/issues/833
import 'reflect-metadata';

export default function App({ Component, pageProps }) {
  const [ session, loading ] = useSession();

  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <title>Beepboop</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
