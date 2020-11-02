// import Header from "./Header";
import Nav from "./Nav";

const Layout = props => (
  <div className='Layout'>
    <Nav />
    <div className='Content'>
      {props.children}
    </div>
    {/* <NavBar /> */}
  </div>
);

export default Layout;