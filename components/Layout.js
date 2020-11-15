// import Header from "./Header";
import Nav from "./Nav";

const Layout = props => (
  <div className='Layout'>
    <Nav />
    <section class="section">{props.children}</section>
  </div>
);

export default Layout;