import { useRouter } from 'next/router'

const navStyle = {
  width: "100%"
};

const logoStyle = {
  fontSize: '3em',
  fontWeight: '700'
};

const navLinks = {
  float: 'right',
  listStyleType: 'none',
};

const navLink = {
  float: 'right',
  marginLeft: '20px'
}

const Nav = () => {
  const router = useRouter();
  const { account } = router.query;

  return (
    <div className="Nav" style={navStyle}>
      <span className="Logo" style={logoStyle}>Day.</span>
      <ul style={navLinks}>
        <li key="nav-days" style={navLink}>days</li>
        <li key="nav-search" style={navLink}>search</li>
        <li key="nav-account" style={navLink}>{ account }</li>
      </ul>
    </div>
  );
};

export default Nav;