import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../utils/mongodb.js';
import 'react-datepicker/dist/react-datepicker.css';


const formTextAreaStyle = {
  width: '100%',
  height: '300px',
  padding: '20px',
  marginTop: '20px',
  marginBottom: '20px',
  fontSize: '1.2em',
  backgroundColor: '#f6f6f6',
  borderRadius: '10px'
};

const buttonStyle = {
  color: '#f6f6f6',
  border: 0,
  fontSize: '1.2em',
  padding: '15px 20px',
  letterSpacing: '0.15em',
  borderRadius: '10px'
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { db } = await connectToDatabase();

  console.log('edits');

  if (!context.query.year || !context.query.month || !context.query.day) {
    return { props: { error: 'No year/month/day specified.' }};
  }
  if (!session && !session.userId) {
    return { props: { error: 'User is not logged in.' } };
  }

  const params = {
    year: +context.query.year,
    month: +context.query.month,
    day: +context.query.day,
    userId: session.userId
  };

  console.log(params);

  const days = await db.collection('days')
    .find(params, { projection: { createdAt: 0, updatedAt: 0 }})
    .toArray();

  console.log(days);

  return { props: { dayText: days[0].text } };
}

const Account = ({ dayText }) => {
  const router = useRouter()
  const [content, setContent] = useState(dayText);
  const [dayDate, setDayDate] = useState(new Date());

  const submitDay = async (e) => {
    e.preventDefault();

    const body = {
      year: dayDate.getFullYear(),
      month: dayDate.getMonth(),
      day: dayDate.getDate(),
      weekday: dayDate.getDay(),
      text: content
    }

    const response = await fetch('/api/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    });

    const json = await response.json();
    return router.push(`/days?year=${body.year}&month=${body.month}&day=${body.day}`);
  }

  return (
    <div>
      <form>
        <DatePicker
          selected={dayDate}
          endDate={dayDate}
          onChange={date => setDayDate(date)}
          className='day-select-input'
          calendarClassName='day-select-calendar' />

        <textarea
          style={formTextAreaStyle}
          value={dayText}
          onChange={(e) => setContent(e.target.value)}>
        </textarea>

        <button
          type="submit"
          style={buttonStyle}
          onClick={submitDay}>Submit</button>
      </form>
    </div>
  );
};

export default Account;
