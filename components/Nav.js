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

const Nav = () => {
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
          <button className="button is-primary" onClick={signIn}>
            <strong>Sign in</strong>
          </button>
        </div>
      }
      </div>
    </div>
    // <nav className="navbar is-transparent border-bottom mb-6" role="navigation" aria-label="main navigation">
    //   <div className="navbar-brand">
    //     <a className="navbar-item" href="/">
    //       <p className="is-size-5"><strong>beepboop</strong> ✏️</p>
    //     </a>

    //     <a
    //       role="button"
    //       className={expand ? 'navbar-burger is-active' : 'navbar-burger'}
    //       aria-label="menu"
    //       aria-expanded="false"
    //       data-target="navbarBasicExample"
    //       onClick={() => setExpand(!expand)}>
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //     </a>
    //   </div>

    //   <div className={expand ? 'navbar-menu is-active' : 'navbar-menu'}>
    //     {session &&
    //       <div className="navbar-end">
    //         <div className="navbar-item">
    //           <a className="circle-button" href="/account">
    //             <img style={accountImageButton} src={session.user.image}></img>
    //           </a>
    //         </div>
    //       </div>
    //     }
    //     {!session &&
    //       <div className="navbar-end">
    //         <div className="navbar-item">
    //           <button className="button is-primary" onClick={signIn}>
    //             <strong>Sign in</strong>
    //           </button>
    //         </div>
    //       </div>
    //     }
    //   </div>
    // </nav> */}
  );
};

export default Nav;
