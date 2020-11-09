import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
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

const Account = ({ days }) => {
  const router = useRouter()
  const [content, setContent] = useState('');
  const [dayDate, setDayDate] = useState(new Date());

  const submitDay = async (e) => {
    e.preventDefault();

    const body = {
      year: dayDate.getFullYear(),
      month: dayDate.getMonth() + 1,
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
          placeholder='What did you do today?'
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
