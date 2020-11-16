import { signIn, signOut, useSession } from 'next-auth/client'
import { randomEmoji } from '../utils/emoji.js';

const accountImageButton = {
  borderRadius: '10%'
}

const Nav = () => {
  const [ session, loading ] = useSession();

  return (
    <navbar class="hero is-fullwidth">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <h1 class="title is-family-monospace">Day {randomEmoji()}</h1>
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              {session &&
                <div class="buttons is-family-monospace">
                  <a class="button is-white has-text-weight-medium" href="/days">📅 Days</a>
                  <a class="button is-primary has-text-weight-bold" href="/new">New ✏️</a>
                  <a class="button" href="/account">
                    <span class="icon">
                      <img style={accountImageButton} src={session.user.image}></img>
                    </span>
                  </a>
                </div>
              }
              {!session &&
                <div class="buttons">
                  <button class="button is-primary" onClick={signIn}>
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