import { useEffect, useState } from 'react';
import { weekday, zeros } from '../utils/date.js';
import { linkify } from '../utils/linkify.js';
import moment from 'moment';

const dayTextStyle = {
  whiteSpace: 'pre-wrap'
};

const controlsStyle = {
  letterSpacing: '0.1em',
  fontSize: '0.85em',
};

const isToday = (dbDay) => {
  console.log(`${dbDay.year}-${dbDay.month}-${dbDay.day}`, moment().format('YYYY-M-D'));
  return moment().format('YYYY-M-D') === `${dbDay.year}-${dbDay.month}-${dbDay.day}`;
}

const Day = props => {
  const [text, setText] = useState(props.children.text);
  const [empty, setEmpty] = useState(props.children.empty);
  const [visualText, setVisualText] = useState(linkify(text));
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(props.children.text);
  const [hover, setHover] = useState(false);
  const [deleteConf, setDeleteConf] = useState(false);
  const [loading, setLoading] = useState(false);

  const query = `?year=${props.children.year}&month=${props.children.month}&day=${props.children.day}`;
  const permalink = `/days${query}`;

  const upsertDay = async(e) => {
    e.preventDefault();
    setLoading(true);

    if (editText == text) {
      console.log('no changes to save');
      return;
    };

    const body = {
      year: props.children.year,
      month: props.children.month,
      day: props.children.day,
      text: editText
    };

    console.log('aout to submit', body);

    const response = await fetch('/api/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const res = await response.json();

    setText(editText);
    setVisualText(linkify(editText));
    setEdit(false);
    setLoading(false);
    setEmpty(false);
  };

  const deleteDay = async(e) => {
    e.preventDefault();

    const body = {
      year: props.children.year,
      month: props.children.month,
      day: props.children.day
    };

    await fetch('/api/days', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    setText('');
    setVisualText('');
    setEdit(false);
    setEmpty(true);
    setDeleteConf(false);
  };

  let dayClass = 'day-container columns';
  if (empty) {
    dayClass += ' mt-2 empty';
  } else {
    dayClass += ' mt-6';
  }
  if (isToday(props.children)) {
    dayClass += ' today'
  }

  return (
    <div
      className={dayClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={props.children._id}>
      <div className="column" key={props.children._id + '-date'}>
        <div className={empty ? "content has-text-weight-semibold is-size-6" : "content has-text-weight-semibold is-size-5"}>
          <span className="content">{props.children.year}</span>
          <span className="content mx-1 has-text-dark">.</span>
          <span className="content">{zeros(props.children.month)}</span>
          <span className="content mx-1 has-text-dark">.</span>
          <span className="content">{zeros(props.children.day)}</span>
          <br />
          <span className="has-text-grey-light has-text-weight-light is-size-6">
            {weekday(props.children.weekday)}
          </span>
        </div>
      </div>
      <div className="column is-three-quarters has-text-weight-medium" style={dayTextStyle} key={props.children._id + '-content'}>
        {!edit &&
          <div className="content">

            {/* CONTENT HERE */}
            <p className="day-text content has-text-weight-normal" dangerouslySetInnerHTML={{__html: visualText}}></p>
            {/* END CONTENT */}

            <div className={hover ? '' : 'is-invisible-desktop'} style={controlsStyle}>
              <div className="columns buttons are-small has-text-weight-semibold">
                <div className="column is-one-fifth">
                  <a className="button is-ghost is-fullwidth" href={permalink}>🔗</a>
                </div>
                <div className="column is-one-fifth">
                  <a className="button is-ghost is-fullwidth" onClick={e => setEdit(true)}>✏️</a>
                </div>
                <div className="column is-one-fifth">
                  {deleteConf &&
                    <a className="button is-danger is-fullwidth" onClick={deleteDay}>🔪 ?</a>
                  }
                  {!deleteConf &&
                    <a className="button is-ghost is-fullwidth" onClick={e => setDeleteConf(true)}>🔪</a>
                  }
                </div>
                <div className="column is-one-fifth">
                  {deleteConf &&
                    <a className="button is-light" onClick={e => setDeleteConf(false)}>🙅‍♀️ nvm</a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
        {edit &&
          <form>
            <div className="field">
              <textarea
                className="day-text content has-text-weight-normal textarea"
                rows="12"
                value={editText}
                onChange={e => setEditText(e.target.value)}>
              </textarea>
            </div>
            <div className="buttons are-small">
              <button
                type="submit"
                className={loading ? "button is-primary has-text-weight-semibold is-loading" : "button is-primary has-text-weight-semibold"}
                onClick={upsertDay}>💾
              </button>
              <button
                className="button is-light has-text-weight-semibold"
                onClick={e => setEdit(false)}>🙅‍♀️ nvm
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default Day;