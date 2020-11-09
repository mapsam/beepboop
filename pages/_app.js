import './main.css';
import Layout from '../components/Layout.js';
import { Provider } from 'next-auth/client'

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
