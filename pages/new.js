import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

const Account = ({ days }) => {
  const router = useRouter()
  const [content, setContent] = useState('');
  const [dayDate, setDate] = useState(new Date());

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
    <div class="container is-family-monospace control">
      <div class="columns is-family-monospace">
        <div class="column is-one-quarter">
          <div class="field">
            <label
              class="label is-family-monospace">Date
            </label>
            <input
              class="input is-family-monospace"
              onChange={e => {
                setDate(new Date(e.target.value + 'T00:00:00'))
              }}
              value={moment(dayDate).format('YYYY-MM-DD')}
              type="date">
            </input>
          </div>
          <div class="field">
            <button
              type="submit"
              class="button is-primary is-family-monospace has-text-weight-semibold is-fullwidth"
              onClick={submitDay}>✏️ Save day
            </button>
          </div>

          <p class="content has-text-grey-light">
            👯‍♀️ <span class="is-italic">Who did you see?</span><br></br>
            🚌 <span class="is-italic">Where did you go?</span><br></br>
            🌯 <span class="is-italic">What did you eat?</span><br></br>
            🤔 <span class="is-italic">How did you feel?</span><br></br>
          </p>
        </div>
        <div class="column is-three-quarters">
          <form>
            <div class="field">
              <label class="label">What did you do on {moment(dayDate).format('dddd, MMMM Do')}?</label>
              <textarea
                class="textarea is-family-monospace"
                rows="12"
                onChange={e => setContent(e.target.value)}>
              </textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
