import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb.js';
import { ObjectID } from 'mongodb';
// import { parser } from 'json2csv';
import converter from 'json-2-csv';
import moment from 'moment';

function log(request) {
  console.log(`${request.method} ${request.url} ${JSON.stringify(request.body)}`);
}

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.json({ error: 'You must be sign in to view the protected content on this page.' });

  log(req);

  const { db } = await connectToDatabase();
  const userId = ObjectID(session.userId);

  // account data download
  if (req.query.download) {
    if (!['json', 'csv'].includes(req.query.download)) return res.status(400).json({ error: '?data= must be set to json or csv' });

    const dt = moment().format('YYYY-MM-DD-HH-mm-ss');
    const data = await db.collection('days')
      .find({ userId: userId }, { projection: { createdAt: 0, updatedAt: 0, _id: 0, userId: 0, date: 0 }})
      .sort({ year: -1, month: -1, day: -1 })
      .toArray();

    res.setHeader('Content-Disposition', `attachment; filename=beepboop_${dt}.${req.query.download}`);

    if (req.query.download === 'csv') {
      const csv = await converter.json2csvAsync(data);
      return res.send(csv);
    } else {
      return res.json(data);
    }
  // get account
  } else {
    const user = await db.collection('users')
      .find({ _id: userId })
      .toArray();

    if (!user.length) return res.json({ error: 'Something went wrong.' });

    return res.json(user[0]);
  }
}