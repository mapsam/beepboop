import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client';
import Content from '../components/Content.js';

export default function Account () {
  const [ session, loading ] = useSession();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ img, setImg ] = useState();
  const [ showToken, setShowToken ] = useState(false);

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/accounts/abcd')
      const json = await res.json()
      if (json) {
        setEmail(json.email);
        setName(json.name);
        setImg(json.image);
      }
    }
    fetchData()
  });

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <div><h1>Access Denied.</h1></div> }

  // If session exists, display content
  return (
    <Content columns={true}>
      <div className="column is-two-thirds">

        <div className="block content">
          <h1 className="has-text-weight-bold title is-1">Account</h1>
          <p class="block">
            This is your account page. You can view your account settings, logout, download
            your account data, or delete your account.</p>
        </div>

        <div className="columns mt-6">
          <div className="column has-text-weight-semibold is-size-5">
            Settings
          </div>
          <div className="column content is-three-quarters">
            <p class="block">
              Account settings are defined by the identify provider you used to sign in.
              If you want to edit these you must make changes in that service.
            </p>
            <p><strong>Email</strong>: {email}</p>
            <p><strong>Name</strong>: {name}</p>
          </div>
        </div>

        <div className="columns mt-6">
          <div className="column has-text-weight-semibold is-size-5">
            Data
          </div>
          <div className="column content is-three-quarters">
            <p><strong>Download account data.</strong> This will download <span class="is-italic">all</span> days associated to your account.</p>
            <button class="button is-info has-text-weight-semibold mr-2 " onClick={signOut} disabled>CSV</button>
            <button class="button is-info has-text-weight-semibold mr-2 " onClick={signOut} disabled>JSON</button>
          </div>
        </div>

        <div className="columns mt-6">
          <div className="column has-text-weight-semibold is-size-5">
            Goodbye
          </div>
          <div className="column content is-three-quarters">
            <div className="block">
              <p><strong>Logout</strong> of your current session.</p>
              <button class="button is-ghost " onClick={signOut}>Logout</button>
            </div>

            <div className="block">
              <p><strong>Delete your account.</strong> This is a permanent action! If you want a record of your data, be sure to download it before deleting your account.</p>
              <button class="button is-danger has-text-weight-bold" onClick={signOut} disabled>Delete account</button>
            </div>
          </div>
        </div>



      </div>
      <div class="column is-one-third"></div>
    </Content>
  )
}