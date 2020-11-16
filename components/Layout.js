// import Header from "./Header";
import Nav from "./Nav";

const Layout = props => (
  <div className='Layout'>
    <Nav />
    {props.children}
  </div>
);

export default Layout;