import Day from '../components/Day.js';
import DayFilters from '../components/DayFilters.js';
import Content from '../components/Content.js';
import { connectToDatabase } from '../utils/mongodb.js';
import { getSession } from 'next-auth/client';
import { useState } from 'react'
import { ObjectID } from 'mongodb';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const newDayTextareaStyle = {
  outline: 'none',
  border: 'none',
  boxShadow: 'none',
  borderBottome: '1px solid #c0c0c0',
  resize: 'none'
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: { days: [] }};

  const { db } = await connectToDatabase();

  const start = moment().subtract(1, 'month');
  const end = moment();
  const range = moment.range(start, end);

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

  console.log(dbDays);

  const days = Array.from(range.reverseBy('day')).map((day) => {
    const y = +day.format('YYYY');
    const m = +day.format('MM');
    const d = +day.format('DD');
    const w = +day.format('d');

    let entry = dbDays.find((dbDay) => {
      return dbDay.year === y && dbDay.month === m && dbDay.day === d;
    });

    if (!entry) entry = {
      empty: true,
      year: y,
      month: m,
      day: d,
      weekday: w
    };

    // console.log(y, m, d, entry);
    return entry;
  });

  return { props: { days } };
}

const Page = ({ days }) => {
  const [ ds, setDays ] = useState(days);
  const [ dayDate, setDate ] = useState(new Date());
  const [ content, setContent ] = useState('');
  const [ placeholder ] = useState(`What did you do on ${moment(dayDate).format('dddd, MMMM Do')}?`);
  const [ loading, setLoading ] = useState(false);
  const [ showSave, setShowSave ] = useState(false);

  const submitDay = async (e) => {
    e.preventDefault();

    const body = {
      year: dayDate.getFullYear(),
      month: dayDate.getMonth() + 1,
      day: dayDate.getDate(),
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
    return window.location.reload();
  };

  const updateContent = async(e) => {
    e.preventDefault();
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    if (e.target.value.length > 0) {
      setShowSave(true);
    } else {
      setShowSave(false);
    }
  };

  return (
    <div>
      <Content columns={true}>
        <div className="column is-two-thirds">
          <form>
            <div className="columns">
              <div className="column">
              </div>

              <div className="column is-three-quarters">
                <div className="field">
                  <textarea
                    className="textarea is-size-5 p-0"
                    rows="1"
                    style={newDayTextareaStyle}
                    placeholder={placeholder}
                    onChange={updateContent}>
                  </textarea>
                </div>

                <div className={showSave ? "field" : "field is-invisible"}>
                  <button
                    type="submit"
                    className={loading ? "button is-ghost has-text-weight-semibold is-loading" : "button is-ghost has-text-weight-semibold"}
                    onClick={submitDay}>💾
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Content>

      <Content columns={true}>
        <div className="column is-two-thirds">
          {ds.map((day) => (
            <Day>{day}</Day>
          ))}
        </div>

        <div className="column">
          <DayFilters />
        </div>
      </Content>
    </div>

  );
};

export default Page;