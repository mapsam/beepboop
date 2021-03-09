import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [ session, loading ] = useSession();
  if (loading) return (<div></div>);

  if (session) router.push('/days');

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container is-max-desktop has-text-centered has-text-primary">
          <h2 className="is-size-5">
            <span className="underline">beepboop</span> is a simple, daily journal.<br />Jot down your feelings, tally your day, or write a poem.<br />Free, private, and built with love ❤️
          </h2>

          {!session &&
          <a className="mt-4" onClick={() => signIn('google')}>
            <img src="/signin-google.png"></img>
          </a>
          }

          {session &&
          <a className="button is-outlined mt-4" href="/days">
            Start writing
          </a>
          }
        </div>
      </div>
    </section>
  );
}
