import Nav from './Nav';
import Footer from './Footer';
import { useSession } from 'next-auth/client';

const Layout = props => {
  const [ session, loading ] = useSession();

  if (loading) return (<div></div>);

  return (<div className='Layout'>
    <Nav />
    {props.children}
    <Footer />
  </div>)
};

export default Layout;