import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb.js';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.json({ error: 'You must be sign in to view the protected content on this page.' });

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    console.log('POST /days session', session);
    const d = new Date();
    const doc = {...req.body};

    doc.createdAt = d;
    doc.updatedAt = d;
    doc.userId = session.userId;
    doc._id = `${session.userId}:${doc.year}${doc.month}${doc.day}`;

    await db.collection('days')
      .update({ _id: doc._id }, doc, { upsert: true });

    return res.json(doc);
  } else {
    const params = {
      userId: session.userId
    };
    if (req.query.year) params.year = +req.query.year;
    if (req.query.month) params.month = +req.query.month;
    if (req.query.day) params.day = +req.query.day;
    if (req.query.weekday) params.weekday = +req.query.weekday;

    const days = await db.collection('days')
      .find(params, { projection: { _id: 0 }})
      .sort({ year: -1, month: -1, day: -1 })
      .toArray();

    return res.json(days);
  }
}