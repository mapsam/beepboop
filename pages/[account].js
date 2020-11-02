import Day from '../components/Day.js';
import { connectToDatabase } from '../utils/mongodb.js';

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const date = new Date();
  const params = {
    account: context.params.account
  };

  // if no params provided, default to showing all days in current month
  if (!Object.keys(context.query).length) {
    params.year = +date.getFullYear();
    params.month = +date.getMonth();
  }

  if (context.query.year) params.year = +context.query.year;
  if (context.query.month) params.month = +context.query.month;
  if (context.query.day) params.day = +context.query.day;
  if (context.query.weekday) params.weekday = +context.query.weekday;

  const days = await db.collection('days')
    .find(params, { projection: { _id: 0 }})
    .sort({ year: -1, month: -1, day: -1 })
    .toArray();

  return { props: { days } };
}

const Account = ({ days }) => {
  return (
    <div>
      {days.map((day) => (
        <Day>{day}</Day>
      ))}
    </div>
  );
};

export default Account;
