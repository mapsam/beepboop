import Content from '../components/Content.js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

const dateInputStyle = {
  border: 'none'
};

const Account = ({ days }) => {
  const router = useRouter()
  const [content, setContent] = useState('');
  const [dayDate, setDate] = useState(new Date());
  const [placeholder, setPlaceholder] = useState(`What did you do on ${moment(dayDate).format('dddd, MMMM Do')}`);
  const [loading, setLoading] = useState(false);

  const submitDay = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    setLoading(false);
    return router.push(`/days?year=${body.year}&month=${body.month}&day=${body.day}`);
  }

  return (
    <Content>
      <form>
        <div class="columns">
          <div class="column is-full">
            <div class="field">
              <h1 class="is-size-3 has-text-black has-text-weight-bold">What did you do on
              <input
                class="is-size-3 has-text-info has-text-weight-bold ml-4"
                style={dateInputStyle}
                onChange={e => {
                  setDate(new Date(e.target.value + 'T00:00:00'))
                }}
                value={moment(dayDate).format('YYYY-MM-DD')}
                type="date"
                required>
              </input>
              ?</h1>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="field">
              <textarea
                class="textarea"
                rows="10"
                placeholder={placeholder}
                onChange={e => setContent(e.target.value)}>
              </textarea>
            </div>

            <div class="field">
              <button
                type="submit"
                className={loading ? "button is-primary has-text-weight-semibold is-loading" : "button is-primary has-text-weight-semibold"}
                onClick={submitDay}>💾&nbsp;&nbsp;Save day
              </button>
            </div>
          </div>


          <div class="column is-one-third">
            <p class="content has-text-grey">
              👯‍♀️ <span class="is-italic">Who did you see?</span><br></br>
              🚌 <span class="is-italic">Where did you go?</span><br></br>
              🌯 <span class="is-italic">What did you eat?</span><br></br>
              🤔 <span class="is-italic">How did you feel?</span><br></br>
            </p>
          </div>
        </div>
      </form>
    </Content>
  );
};

export default Account;
