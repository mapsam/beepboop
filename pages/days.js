import Day from '../components/Day.js';
import { connectToDatabase } from '../utils/mongodb.js';
import { getSession } from 'next-auth/client';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: { days: [] }};

  const { db } = await connectToDatabase();

  const date = new Date();
  const params = {
    userId: session.userId
  };

  // if no params provided, default to showing all days in current month
  if (!Object.keys(context.query).length) {
    params.year = +date.getFullYear();
    params.month = +date.getMonth() + 1;
  }

  if (context.query.year) params.year = +context.query.year;
  if (context.query.month) params.month = +context.query.month;
  if (context.query.day) params.day = +context.query.day;
  if (context.query.weekday) params.weekday = +context.query.weekday;

  const days = await db.collection('days')
    .find(params, { projection: { createdAt: 0, updatedAt: 0 }})
    .sort({ year: -1, month: -1, day: -1 })
    .toArray();

  return { props: { days } };
}

const Page = ({ days }) => {
  return (
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-quarters">
            {days.map((day) => (
              <Day>{day}</Day>
            ))}
          </div>
          <div class="column">
            /days sidebar
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;