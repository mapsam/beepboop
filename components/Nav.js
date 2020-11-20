import { signIn, signOut, useSession } from 'next-auth/client'
import { randomEmoji } from '../utils/emoji.js';

const accountImageButton = {
  borderRadius: '10%'
}

const Nav = () => {
  const [ session, loading ] = useSession();

  return (
    <navbar className="hero is-fullwidth">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className="title is-family-monospace">Day {randomEmoji()}</h1>
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
                    <strong>Login</strong>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </navbar>
  );
};

export default Nav;