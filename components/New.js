import { today } from '../utils/date.js';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import moment from 'moment';

export default function New({ hasEntry, submit }) {
  const [ session ] = useSession();
  const { year, month, day } = today();
  const [ text, setText ] = useState('');
  const now = moment();
  const tomorrow = moment().add(1, 'day').startOf('day');
  const duration = moment.duration(tomorrow - now);
  const [ againTime, setAgainTime ] = useState(duration);

  setInterval(() => {
    const dur = moment.duration(duration - 1000);
    setAgainTime(dur);
  }, 1000);

  const insertDay = async(e) => {
    e.preventDefault();

    const body = {
      year,
      month,
      day,
      text
    };

    const response = await fetch('/api/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return submit(data);
  };

  if (hasEntry) {
    return (
      <div key="new-entry-component">
        <p className="has-text-primary is-italic">You can submit again in {duration.hours()} hours, {duration.minutes()} minutes.</p>
      </div>
    )
  }

  return (
    <div className="container" key="new-entry-component">
      <div className="content has-text-primary">
        <p className="day-text content is-size-5">{session.user.name.split(' ')[0]}, let's talk about <span className="is-underlined">{year}-{month}-{day}</span>.</p>
      </div>
      <form>
        <div className="field">
          <textarea
            className="day-textarea textarea content has-text-weight-normal has-text-primary is-size-5"
            rows="10"
            onChange={e => setText(e.target.value)}>
          </textarea>
        </div>
        <button
          type="submit"
          className="button is-info has-text-weight-semibold"
          disabled={!text.length}
          onClick={insertDay}>💾 save
        </button>
      </form>
    </div>
  );
}