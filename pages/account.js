import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client';
import Content from '../components/Content.js';

const settingsStyle = {
  borderTop: '1px solid #dddddd'
}

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
    <Content>
      <div class="columns my-6 pt-6">
        <div class="column is-two-thirds">
          <p class="has-text-weight-bold title is-1">Account</p>
          <p class="block">
            This is your account page. You can view your account settings, logout, download
            your account data, or delete your account.
          </p>

          <p class="block">
            Account settings are defined by your identify provider, Google.
            If you want to edit these you must make changes in your Google account.
          </p>
        </div>
      </div>

      <div class="columns my-6 pt-6" style={settingsStyle}>
        <div class="column is-one-quarter">
          <p class="has-text-weight-bold title is-4">Settings</p>
        </div>
        <div class="column content">
          <p>
            <span class="has-text-weight-bold">Email</span>
            <br />
            {email}
          </p>

          <p>
            <span class="has-text-weight-bold">Name</span>
            <br />
            {name}
          </p>

          <p>
            <span class="has-text-weight-bold">Image</span>
            <br />
            <img src={img} />
          </p>
        </div>
      </div>

      <div class="columns my-6 pt-6" style={settingsStyle}>
        <div class="column is-one-quarter">
          <p class="has-text-weight-bold title is-4">Data</p>
        </div>
        <div class="column content">
          <p class="has-text-weight-bold">Download account data</p>
          <p>This will download <span class="is-italic">all</span> days associated to your account.</p>
          <button class="button is-info is-family-monospace has-text-weight-semibold mr-2 is-small" onClick={signOut}>CSV</button>
          <button class="button is-info is-family-monospace has-text-weight-semibold mr-2 is-small" onClick={signOut}>JSON</button>
        </div>
      </div>

      {/* <div class="columns my-6 pt-6" style={settingsStyle}>
        <div class="column is-one-quarter">
          <p class="has-text-weight-bold title is-4">Developer</p>
        </div>
        <div class="column content">
          <p class="has-text-weight-bold">Access token</p>
          <pre>
            {showToken ? session.accessToken : '🔒 ... hidden ...'}
          </pre>
          <button
            class="button is-inversed is-info is-family-monospace is-small has-text-weight-semibold"
            onClick={() => setShowToken(!showToken)}>
              {showToken ? 'hide token' : 'show token'}
          </button>
        </div>
      </div> */}

      <div class="columns my-6 pt-6" style={settingsStyle}>
        <div class="column is-one-quarter">
          <p class="has-text-weight-bold title is-4">Goodbye.</p>
        </div>
        <div class="column content">
          <div class="block">
            <p class="has-text-weight-bold">Logout</p>
            <p>This will log your out of your current session.</p>
            <button class="button is-ghost is-family-monospace is-small" onClick={signOut}>Logout</button>
          </div>

          <div class="block">
            <p class="has-text-weight-bold">Delete your account</p>
            <p>This is a permanent action! If you want a record of your data, be sure to download it before deleting your account.</p>
            <button class="button is-danger is-family-monospace is-small has-text-weight-bold" onClick={signOut}>Delete account</button>
          </div>
        </div>
      </div>
    </Content>
  )
}
