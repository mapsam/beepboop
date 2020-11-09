import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client';

export default function Account () {
  const [ session, loading ] = useSession();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ img, setImg ] = useState();

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
    <div>
      <p>Account settings</p>
      <p>Email: {email}</p>
      <p>Name: {name}</p>
      <img src={img}></img>
    </div>
  )
}
