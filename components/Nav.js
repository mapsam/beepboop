import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'

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

const authButton = {
  background: 'none',
  color: '#f012be',
  fontSize: '1em',
  textDecoration: 'underline',
  border: 'none',
  padding: '0',
  margin: '0 10px'
}

const Nav = () => {
  const router = useRouter();
  const [ session, loading ] = useSession();

  return (
    <div className="Nav" style={navStyle}>
      <span className="Logo" style={logoStyle}>Day.</span>
      <ul style={navLinks}>
        <li key="nav-new" style={navLink}>
          <a style={authButton} href="/new">new</a>
        </li>
        <li key="nav-account" style={navLink}>
        {!session && <>
          <button style={authButton} onClick={signIn}>Login</button>
        </>}
        {session && <>
          <a style={authButton} href="/days">{session.user.email}</a>
          <button style={authButton} onClick={signOut}>Logout</button>
        </>}
        </li>
      </ul>
    </div>
  );
};

export default Nav;