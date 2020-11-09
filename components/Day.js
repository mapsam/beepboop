const dayStyle = {
  width: "100%",
  marginTop: '40px',
};

const dayDateStyle = {
  fontWeight: '700',
  margin: '0px',
  padding: '0px'
};

const dayDateSpacerStyle = {
  marginLeft: '10px',
  marginRight: '10px',
  color: '#39CCCC',
  fontWeight: '700'
};

const dayPermalinkStyle = {
  color: '#F012BE',
  fontWeight: '700',
  marginLeft: '20px',
  textDecoration: 'none'
};

const editDayStyle = {
  color: '#c0c0c0',
  fontWeight: '700',
  marginLeft: '20px',
  textDecoration: 'none'
};

const dayTextStyle = {
  marginTop: '7px',
  fontSize: '1.15em',
  lineHeight: '1.2em',
  whiteSpace: 'pre-wrap'
}

const Day = props => {
  const query = `?year=${props.children.year}&month=${props.children.month}&day=${props.children.day}`;
  const permalink = `/days?${query}`;
  const editlink = `/edit?${query}`;
  return (
    <div className="Day" style={dayStyle} key={props.children._id}>
      <div style={dayDateStyle}>
        <span className="DayYear">{props.children.year}</span>
        <span style={dayDateSpacerStyle}>/</span>
        <span className="DayMonth">{props.children.month}</span>
        <span style={dayDateSpacerStyle}>/</span>
        <span className="DayDay">{props.children.day}</span>
        <a style={dayPermalinkStyle} href={permalink}>#</a>
        <a style={editDayStyle} href={editlink}>edit</a>
      </div>
      <p style={dayTextStyle}>{props.children.text}</p>
    </div>
  );
};

export default Day;