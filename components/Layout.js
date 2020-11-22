import Nav from './Nav';
import Footer from './Footer';

const Layout = props => (
  <div className='Layout'>
    <Nav />
    {props.children}
    <Footer />
  </div>
);

export default Layout;