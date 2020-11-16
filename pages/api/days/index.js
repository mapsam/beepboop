import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb.js';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.json({ error: 'You must be signed in to use this API.' });

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    console.log('POST', req.body);
    const d = new Date();
    const doc = {...req.body};

    doc.createdAt = d;
    doc.updatedAt = d;
    doc.userId = session.userId;
    doc._id = `${session.userId}:${doc.year}${doc.month}${doc.day}`;

    await db.collection('days')
      .update({ _id: doc._id }, doc, { upsert: true });

    return res.json(doc);
  } else if (req.method === 'PUT') {
    console.log('PUT', req.body);
    if (!req.body.year) return res.status(400).json({message: 'no year provided'});
    if (!req.body.month) return res.status(400).json({message: 'no month provided'});
    if (!req.body.day) return res.status(400).json({message: 'no day provided'});
    if (!req.body.text) return res.status(400).json({message: 'no text provided'});

    const id = `${session.userId}:${req.body.year}${req.body.month}${req.body.day}`;
    const set = {
      $set: {
        updatedAt: new Date(),
        text: req.body.text
      }
    };

    await db.collection('days')
      .updateOne({ _id: id }, set);

    return res.json(201);
  } else if (req.method === 'DELETE') {
    console.log('DELETE', req.body);
    if (!req.body.year) return res.status(400).json({message: 'no year provided'});
    if (!req.body.month) return res.status(400).json({message: 'no month provided'});
    if (!req.body.day) return res.status(400).json({message: 'no day provided'});

    const id = `${session.userId}:${req.body.year}${req.body.month}${req.body.day}`;

    await db.collection('days')
      .deleteOne({ _id: id }, true);

    return res.status(204).send('');
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