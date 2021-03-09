import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

const accountImageButton = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'inline-block',
  maxHeight: '100%'
};

export default function () {
  const [ expand, setExpand ] = useState(false);
  const [ session, loading ] = useSession();
  const router = useRouter();

  return (
    <div className="navbar is-transparent border-bottom mb-6">
      <a className="navbar-item px-0" href="/">
        <p className="is-size-5 has-text-primary">beepboop ✏️</p>
      </a>

      <div className="navbar-end">
      {session &&
        <div className="navbar-item">
          <a className="circle-button" href="/account">
            <img style={accountImageButton} src={session.user.image}></img>
          </a>
        </div>
      }
      {!session &&
        <div className="navbar-item">
          <button className="button is-primary" onClick={() => signIn('google')}>
            <strong>Sign in</strong>
          </button>
        </div>
      }
      </div>
    </div>
  );
}