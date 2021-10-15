import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Account () {
  const [ session, loading ] = useSession();
  const router = useRouter();

  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/account');
      const json = await res.json();
      if (json) {
        setEmail(json.email);
        setName(json.name);
      }
    }
    fetchData();
  });

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists return to home page
  if (!session) router.push('/');

  // If session exists, display content
  return (
    <div className="is-size-5">
      <div className="block content">
        <h1 className="has-text-primary has-text-weight-bold title">Account</h1>
        <p className="has-text-primary block">
          This is your account page. You can view your account settings, logout, download
          your account data, or delete your account.</p>
      </div>

      <div className="columns mt-6">
        <div className="column has-text-weight-semibold">
          <h2 className="is-size-5 has-text-weight-semibold has-text-primary">Settings</h2>
        </div>
        <div className="column content is-three-quarters">
          <p className="block has-text-primary">
            Account settings are defined by the identify provider you used to sign in.
            If you want to edit these you must make changes in that service.
          </p>
          <p className="has-text-primary"><span className="underline has-text-weight-bold">Email</span>: {email}</p>
          <p className="has-text-primary"><span className="underline has-text-weight-bold">Name</span>: {name}</p>
        </div>
      </div>

      <div className="columns mt-6">
        <div className="column">
          <h2 className="is-size-5 has-text-weight-semibold has-text-primary">Data</h2>
        </div>
        <div className="column content is-three-quarters">
          <p className="has-text-primary"><span className="underline has-text-weight-semibold">Download account data.</span> This will download <span className="is-italic">all</span> days associated to your account.</p>
          <Link href="/api/account?download=json"><a className="button is-info has-text-weight-semibold mr-2">JSON</a></Link>
          <Link href="/api/account?download=csv"><a className="button is-info has-text-weight-semibold mr-2">CSV</a></Link>
        </div>
      </div>

      <div className="columns mt-6">
        <div className="column">
          <h2 className="is-size-5 has-text-weight-semibold has-text-primary">Goodbye</h2>
        </div>
        <div className="column content is-three-quarters">
          <div className="block">
            <p className="has-text-primary"><span className="underline has-text-weight-semibold">Logout</span> of your current session.</p>
            <button className="button is-ghost " onClick={signOut}>Logout</button>
          </div>

          <div className="block">
            <p className="has-text-primary"><span className="underline has-text-weight-semibold">Delete your account.</span> This is a permanent action! If you want a record of your data, be sure to download it before deleting your account.</p>
            <button className="button is-danger has-text-weight-bold" onClick={signOut} disabled>Delete account</button>
          </div>
        </div>
      </div>

    </div>
  )
}