import { useState } from 'react';
import { weekday, zeros, isToday } from '../utils/date.js';
import { linkify } from '../utils/linkify.js';

const dayTextStyle = {
  whiteSpace: 'pre-wrap'
};

const controlsStyle = {
  letterSpacing: '0.1em',
  fontSize: '0.85em',
};

export default function Day(props) {
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
      return;
    };

    const body = {
      year: props.children.year,
      month: props.children.month,
      day: props.children.day,
      text: editText
    };

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
    setEditText('');
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
  if (isToday(props.children.year, props.children.month, props.children.day)) {
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
          <span className="content has-text-primary">{props.children.year}</span>
          <span className="content mx-1 has-text-warning">.</span>
          <span className="content has-text-primary">{zeros(props.children.month)}</span>
          <span className="content mx-1 has-text-warning">.</span>
          <span className="content has-text-primary">{zeros(props.children.day)}</span>
          <br />
          <span className="has-text-primary has-text-weight-light is-size-6">
            {weekday(props.children.weekday)}
          </span>
        </div>
      </div>
      <div className="column is-three-quarters has-text-weight-medium" style={dayTextStyle} key={props.children._id + '-content'}>
        {!edit &&
          <div className="content has-text-primary">

            {/* CONTENT HERE */}
            <p className="day-text content has-text-weight-normal" dangerouslySetInnerHTML={{__html: visualText}}></p>
            {/* END CONTENT */}

            <div className={hover ? '' : 'is-invisible-desktop'} style={controlsStyle}>
              <div className="columns buttons are-small has-text-weight-semibold">
                <div className="column is-one-fifth">
                  <a className="button is-info is-fullwidth" onClick={e => setEdit(true)}>✏️</a>
                </div>

                <div className="column is-one-fifth">
                  {!empty &&
                    <div>
                    {deleteConf &&
                      <a className="button is-danger is-fullwidth" onClick={deleteDay}>🗑 ?</a>
                    }
                    {!deleteConf &&
                      <a className="button is-info is-fullwidth" onClick={e => setDeleteConf(true)}>🗑</a>
                    }
                    </div>
                  }
                </div>
                <div className="column is-one-fifth">
                  {deleteConf &&
                    <a className="button is-info" onClick={e => setDeleteConf(false)}>🙅‍♀️ nvm</a>
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
                className="day-textarea textarea content has-text-weight-normal has-text-primary"
                rows="12"
                value={editText}
                onChange={e => setEditText(e.target.value)}>
              </textarea>
            </div>
            <div className="buttons are-small">
              <button
                type="submit"
                className={loading ? "button is-info has-text-weight-semibold is-loading" : "button is-info has-text-weight-semibold"}
                onClick={upsertDay}>💾 save
              </button>
              <button
                className="button is-info has-text-weight-semibold"
                onClick={e => setEdit(false)}>🙅‍♀️ nvm
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}