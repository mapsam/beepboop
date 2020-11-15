import { useState } from 'react';

const dayTextStyle = {
  whiteSpace: 'pre-wrap'
};

const controlsStyle = {
  letterSpacing: '0.1em',
  fontSize: '0.85em',
};

const Day = props => {
  const [text, setText] = useState(props.children.text);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(props.children.text);
  const [hover, setHover] = useState(false);
  const [deleteConf, setDeleteConf] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const query = `?year=${props.children.year}&month=${props.children.month}&day=${props.children.day}`;
  const permalink = `/days${query}`;

  const updateDay = async(e) => {
    e.preventDefault();

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

    const response = await fetch('/api/days', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    await response.json();
    setText(editText)
    setEdit(false);
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

    setDeleted(true);
  };

  if (deleted) return (<div></div>);

  return (
    <div
      class="columns mb-6 is-family-monospace"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={props.children._id}>
      <div class="column has-text-link has-text-weight-semibold">
        <div class="content">
          <span class="content">{props.children.year}</span>
          <span class="content mx-1 has-text-dark">/</span>
          <span class="content">{props.children.month}</span>
          <span class="content mx-1 has-text-dark">/</span>
          <span class="content">{props.children.day}</span>
        </div>
      </div>
      <div class="column is-three-quarters has-text-weight-medium" style={dayTextStyle}>
        {!edit &&
          <div class="content">
            <p class="content">{text}</p>
            <div class={hover ? '' : 'is-invisible-desktop'} style={controlsStyle}>
              <div class="columns buttons are-small has-text-weight-semibold">
                <div class="column is-one-quarter">
                  <a class="button is-ghost is-fullwidth" href={permalink}>🔗 permalink</a>
                </div>
                <div class="column is-one-quarter">
                  <a class="button is-ghost is-fullwidth" onClick={e => setEdit(true)}>✏️ edit</a>
                </div>
                <div class="column is-one-quarter">
                  {deleteConf &&
                    <a class="button is-danger is-fullwidth" onClick={deleteDay}>🔪 really?</a>
                  }
                  {!deleteConf &&
                    <a class="button is-ghost is-fullwidth" onClick={e => setDeleteConf(true)}>🔪 delete</a>
                  }
                </div>
                <div class="column is-one-quarter">
                  {deleteConf &&
                    <a class="button is-light" onClick={e => setDeleteConf(false)}>🙅‍♀️ nvm</a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
        {edit &&
          <form>
            <div class="field">
              <textarea
                class="textarea is-family-monospace"
                rows="12"
                value={editText}
                onChange={e => setEditText(e.target.value)}>
              </textarea>
            </div>
            <div class="buttons are-small">
              <button
                type="submit"
                class="button is-primary is-family-monospace has-text-weight-semibold"
                onClick={updateDay}>💾 Save changes
              </button>
              <button
                class="button is-light is-family-monospace has-text-weight-semibold"
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