import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';

const accountImageButton = {
  borderRadius: '10%'
}

const Nav = () => {
  const [ session, loading ] = useSession();
  const router = useRouter();

  // sticky nav on landing page
  const navClass = router.pathname === '/' ? 'navbar is-fixed-top' : 'navbar';

  return (
    <nav className={navClass} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title is-family-monospace">🌳 Day</h1>
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {session &&
              <div className="buttons is-family-monospace">
                <a className="button is-white has-text-weight-medium" href="/days">📅 Days</a>
                <a className="button is-primary has-text-weight-bold" href="/new">New ✏️</a>
                <a className="button" href="/account">
                  <span className="icon">
                    <img style={accountImageButton} src={session.user.image}></img>
                  </span>
                </a>
              </div>
            }
            {!session &&
              <div className="buttons">
                <button className="button is-primary" onClick={signIn}>
                  <strong>Sign in</strong>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;