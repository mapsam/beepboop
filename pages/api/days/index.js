import { getSession } from 'next-auth/client';
import { connectToDatabase, dayId } from '../../../utils/mongodb.js';
import { ObjectID } from 'mongodb';

function log(request) {
  console.log(`${request.method} ${request.url} ${JSON.stringify(request.body)}`);
}

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.json({ error: 'You must be signed in to use this API.' });

  const { db } = await connectToDatabase();
  log(req);

  // create day
  if (req.method === 'POST') {
    if (!req.body.year) return res.status(400).json({message: 'no year provided'});
    if (!req.body.month) return res.status(400).json({message: 'no month provided'});
    if (!req.body.day) return res.status(400).json({message: 'no day provided'});
    if (!req.body.text) return res.status(400).json({message: 'no text provided'});

    const d = new Date();

    const params = {
      userId: ObjectID(session.userId),
      year: +req.body.year,
      month: +req.body.month,
      day: +req.body.day,
      text: req.body.text,
      createdAt: d,
      updatedAt: d
    };

    await db.collection('days').insertOne(params);

    return res.json({
      year: +req.body.year,
      month: +req.body.month,
      day: +req.body.day,
      text: +req.body.text
    });

  // modify day
  } else if (req.method === 'PUT') {
    if (!req.body.year) return res.status(400).json({message: 'no year provided'});
    if (!req.body.month) return res.status(400).json({message: 'no month provided'});
    if (!req.body.day) return res.status(400).json({message: 'no day provided'});
    if (!req.body.text) return res.status(400).json({message: 'no text provided'});

    const params = {
      userId: ObjectID(session.userId),
      year: +req.body.year,
      month: +req.body.month,
      day: +req.body.day
    };

    const set = {
      $set: {
        updatedAt: new Date(),
        text: req.body.text
      }
    };

    await db.collection('days').updateOne(params, set);

    return res.json(201);

  // remove day
  } else if (req.method === 'DELETE') {
    if (!req.body.year) return res.status(400).json({message: 'no year provided'});
    if (!req.body.month) return res.status(400).json({message: 'no month provided'});
    if (!req.body.day) return res.status(400).json({message: 'no day provided'});

    const params = {
      userId: ObjectID(session.userId),
      year: +req.body.year,
      month: +req.body.month,
      day: +req.body.day
    };

    await db.collection('days').deleteOne(params, true);

    return res.status(204).send('');

  // get day(s)
  } else {
    const params = {
      userId: ObjectID(session.userId)
    };

    if (req.query.year) params.year = +req.query.year;
    if (req.query.month) params.month = +req.query.month;
    if (req.query.day) params.day = +req.query.day;
    if (req.query.weekday) params.weekday = +req.query.weekday;

    const days = await db.collection('days')
      .find(params, { projection: { createdAt: 0, updatedAt: 0, _id: 0, userId: 0 }})
      .sort({ year: -1, month: -1, day: -1 })
      .toArray();

    return res.json(days);
  }
}