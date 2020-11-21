import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useState } from 'react';

const accountImageButton = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'inline-block'
};

const Nav = () => {
  const [ expand, setExpand ] = useState(false);
  const [ session, loading ] = useSession();
  const router = useRouter();

  // sticky nav on landing page
  const navClass = router.pathname === '/' ? 'navbar is-fixed-top is-transparent' : 'navbar is-transparent';

  return (
    <nav className={navClass} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title underline">beepboop.</h1>
        </a>

        <a
          role="button"
          className={expand ? 'navbar-burger is-active' : 'navbar-burger'}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setExpand(!expand)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={expand ? 'navbar-menu is-active' : 'navbar-menu'}>
        {session &&
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button is-white has-text-weight-medium" href="/days">📅 Days</a>
            </div>

            <div className="navbar-item">
              <a className="button is-primary has-text-weight-bold" href="/new">New ✏️</a>
            </div>

            <div className="navbar-item">
              <a className="circle-button" href="/account">
                <img style={accountImageButton} src={session.user.image}></img>
              </a>
            </div>
          </div>
        }
        {!session &&
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-primary" onClick={signIn}>
                <strong>Sign in</strong>
              </button>
            </div>
          </div>
        }
      </div>
    </nav>
  );
};

export default Nav;