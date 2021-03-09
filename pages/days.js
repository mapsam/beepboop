import Day from '../components/Day.js';
import { connectToDatabase } from '../utils/mongodb.js';
import { fillDays } from '../utils/date.js';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ObjectID } from 'mongodb';
import moment from 'moment';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: { days: [] }};

  const { db } = await connectToDatabase();

  const start = moment().subtract(1, 'month');
  const end = moment();

  const params = {
    userId: ObjectID(session.userId),
    date: {
      $lt: end.toDate(),
      $gte: start.toDate()
    }
  };

  const dbDays = await db.collection('days')
    .find(params, { projection: { createdAt: 0, updatedAt: 0, _id: 0, userId: 0, date: 0 }})
    .sort({ year: -1, month: -1, day: -1 })
    .toArray();

  return { props: { days: fillDays(dbDays, start, end), start: start.subtract(1, 'day').format('YYYY-MM-DD') } };
}

export default function Page ({ days, start }) {
  const router = useRouter();
  const [ session, loading ] = useSession();
  const [ ds, setDays ] = useState(days);
  const [ nextDate, setNextDate ] = useState(start);
  const [ loadingDays, setLoadingDays ] = useState(false);
  const [ noMoreDays, setNoMoreDays ] = useState(false);

  async function loadMoreDays(e) {
    e.preventDefault();
    setLoadingDays(true);
    const endD = moment(nextDate);
    const startD = moment(nextDate).subtract(1, 'month');

    const response = await fetch(`/api/days?between=${startD.format('YYYY-MM-DD')}:${endD.format('YYYY-MM-DD')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const res = await response.json();

    if (!res.length) {
      setNoMoreDays(true);
    } else {
      const filled = fillDays(res, startD, endD);
      setNextDate(startD.subtract(1, 'day').format('YYYY-MM-DD'));
      setDays(ds.concat(filled));
    }

    setLoadingDays(false);
  }

  // If no session exists return to home page
  if (loading && !session) router.push('/');

  return (
    <div className="days-all">
      {ds.map((day) => (
        <Day>{day}</Day>
      ))}

      <div className="content has-text-primary has-text-centered">
        {noMoreDays &&
          <p>✋ No more days!</p>
        }

        {!noMoreDays &&
          <button
            className={loadingDays ? "button is-info has-text-weight-semibold is-loading" : "button is-info has-text-weight-semibold"}
            onClick={loadMoreDays}>
              Load more days
          </button>
        }
      </div>
    </div>
  );
}