import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb.js';

export default async (req, res) => {
  const { accountId } = req.query;

  const session = await getSession({ req });
  if (!session) return res.json({ error: 'You must be sign in to view the protected content on this page.' });

  const { db } = await connectToDatabase();
  console.log(session);
  const user = await db.collection('users')
    .find({ email: session.user.email })
    .toArray();

  if (!user.length) return res.json({ error: 'Something went wrong.' });

  return res.json(user[0]);
}