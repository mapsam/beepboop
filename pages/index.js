import { signIn, signOut, useSession } from 'next-auth/client';

const underlineStyle = {
  textDecoration: 'underline'
}

const Account = ({ days }) => {
  const [ session, loading ] = useSession();

  return (
    <section className="hero is-fullheight is-fullheight-with-navbar has-bg-img">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-family-monospace">
              <h1 className="title has-text-weight-light">
                <span className="has-text-weight-bold" style={underlineStyle}>Day</span> is a simple, daily journal.</h1>
                <h2 className="subtitle">Free, private, built with love ❤️ and coffee ☕️</h2>

                {!session &&
                <a className="mt-4" onClick={() => signIn('google')}>
                  <img src="/signin-google.png"></img>
                </a>
                }

                {session &&
                <a className="button is-primary mt-4" href="/days">
                  Start writing
                </a>
                }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
