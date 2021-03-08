import Nav from './Nav';
import Footer from './Footer';
import { useSession } from 'next-auth/client';

const Layout = props => {
  const [ session, loading ] = useSession();

  if (loading) return (<div></div>);

  return (
    <div className='Layout'>
      <section className='container is-max-desktop'>
        <Nav />
      </section>

      <section className='container is-max-desktop'>
        {props.children}
      </section>

      <section className='container is-max-desktop'>
        <Footer />
      </section>
    </div>
  )
};

export default Layout;