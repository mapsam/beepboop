import { signIn, signOut, useSession } from 'next-auth/client';

const underlineStyle = {
  textDecoration: 'underline'
}

const Account = ({ days }) => {
  const [ session, loading ] = useSession();

  return (
    <section className="hero is-fullheight is-fullheight-with-navbar has-bg-img">
      <div className="hero-body">
        <div className="container is-max-desktop">
          <div className="columns">
            <div className="column is-half">
                <h1 className="title is-size-2">MeepMoop! 🤖</h1>
                <h2 className="is-size-5"><span className="subtitle has-text-weight-bold underline">Beepboop</span> is a simple, daily journal. Jot down your feelings, record what you ate, or write a poem. 1000 characters per day.<br /><br />Private, free, &amp; built with love ❤️</h2>

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
