import { useEffect, useState } from 'react';
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
  const id = `${props.year}-${props.month}-${props.day}`;
  const [text, setText] = useState(props.text);
  const [empty, setEmpty] = useState(props.empty);
  const [visualText, setVisualText] = useState(linkify(text));
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(props.text);
  const [hover, setHover] = useState(false);
  const [deleteConf, setDeleteConf] = useState(false);
  const [loading, setLoading] = useState(false);

  // reset text if props.text is updated
  // which typically happens when the user adds a
  // new day with the <New /> component from
  // within the days.js page.
  useEffect(() => {
    setText(props.text);
    setVisualText(linkify(props.text));
    setEditText(props.text);
  }, [props.text]);

  const upsertDay = async(e) => {
    e.preventDefault();
    setLoading(true);

    if (editText == text) {
      return;
    };

    const body = {
      year: props.year,
      month: props.month,
      day: props.day,
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
      year: props.year,
      month: props.month,
      day: props.day
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
  if (isToday(props.year, props.month, props.day)) {
    dayClass += ' today'
  }

  return (
    // <div>
    //   {props.year}-{props.month}-{props.day}<br />
    //   {props.text}
    // </div>
    <div
      className={dayClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={`${id}-container`}>
      <div className="column" key={`${id}-date`}>
        <div className={empty ? "content has-text-weight-semibold is-size-6" : "content has-text-weight-semibold is-size-5"}>
          <span className="content has-text-primary is-size-4">{props.year}-{zeros(props.month)}-{zeros(props.day)}</span>
          <br />
          <span className="has-text-primary has-text-weight-light is-size-6">
            {weekday(props.weekday)}
          </span>
        </div>
      </div>
      <div className="column is-three-quarters has-text-weight-medium" style={dayTextStyle} key={`${id}-content`}>
        {!edit &&
          <div className="content has-text-primary">

            {/* CONTENT HERE */}
            <p key={`${id}-text-content`} className="day-text content has-text-weight-normal is-size-5" dangerouslySetInnerHTML={{__html: visualText}}></p>
            {/* END CONTENT */}

            <div className={hover ? '' : 'is-invisible-desktop'} style={controlsStyle}>
              <div className="columns buttons has-text-weight-semibold">
                <div key="day-button-section-edit" className="column is-one-fifth">
                  <a className="button is-info is-fullwidth" onClick={e => setEdit(true)}>✏️</a>
                </div>

                <div key="day-button-section-delete" className="column is-one-fifth">
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
                <div key="day-button-section-delete-confirm" className="column is-one-fifth">
                  {deleteConf &&
                    <a className="button is-info" onClick={e => setDeleteConf(false)}>🙅‍♀️ cancel</a>
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
                className="day-textarea textarea content has-text-weight-normal has-text-primary is-size-5"
                rows="12"
                value={editText}
                onChange={e => setEditText(e.target.value)}>
              </textarea>
            </div>
            <div className="buttons">
              <button
                type="submit"
                className={loading ? "button is-info has-text-weight-semibold is-loading" : "button is-info has-text-weight-semibold"}
                onClick={upsertDay}>💾 save
              </button>
              <button
                className="button is-info has-text-weight-semibold"
                onClick={e => setEdit(false)}>🙅‍♀️ cancel
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  );
}