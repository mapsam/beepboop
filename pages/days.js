import Day from '../components/Day.js';
import New from '../components/New.js';
import { isToday } from '../utils/date.js';
import { connectToDatabase } from '../utils/mongodb.js';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ObjectID } from 'mongodb';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: { days: [] }};

  const { db } = await connectToDatabase();

  const params = {
    userId: ObjectID(session.userId)
  };

  const days = await db.collection('days')
    .find(params, { projection: { createdAt: 0, updatedAt: 0, _id: 0, userId: 0, date: 0 }})
    .sort({ year: -1, month: -1, day: -1 })
    .skip(0)
    .limit(30)
    .toArray();

  return { props: { days } };
}

export default function Days({ days }) {
  const router = useRouter();
  const [ session, loading ] = useSession();
  const [ ds, setDays ] = useState(days);
  const [ page, setPage ] = useState(2);
  const [ loadingDays, setLoadingDays ] = useState(false);
  const [ noMoreDays, setNoMoreDays ] = useState(false);
  const [ hasTodayEntry, setHasTodayEntry ] = useState(isToday(ds[0]));

  function addNewEntry(entry) {
    const newDays = [...ds];
    newDays.unshift(entry);
    setDays(newDays);
    setHasTodayEntry(true);
  }

  async function loadMoreDays(e) {
    e.preventDefault();
    setLoadingDays(true);

    const response = await fetch(`/api/days?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const res = await response.json();

    if (!res.length) {
      setNoMoreDays(true);
    } else {
      setPage(page + 1);
      setDays(ds.concat(res));
    }

    setLoadingDays(false);
  }

  // If no session exists return to home page
  if (loading && !session) router.push('/');

  return (
    <div>
      <div key="add-new-day">
        <New
          hasEntry={hasTodayEntry}
          submit={addNewEntry} />
      </div>

      <div className="days-all">
        {ds.map((day) => (
          <Day
            empty={day._empty}
            text={day.text}
            year={day.year}
            month={day.month}
            day={day.day}
            weekday={day.weekday} />
        ))}
      </div>

      <div key="get-more-days" className="content has-text-primary has-text-centered">
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