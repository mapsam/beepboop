import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createDay } from '../utils/collection-days.js';
import { connectToDatabase } from '../utils/mongodb.js';

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
  const [content, setContent] = useState('');
  const [dayDate, setDayDate] = useState(new Date());

  const submitDay = async (e) => {
    e.preventDefault();
    const item = createDay(dayDate, 'leslieknope', content);

    const { db } = await connectToDatabase();
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
