import Content from './Content';

const Footer = props => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <div className="content my-6 pb-6 pt-3 border-top is-size-5 has-text-primary">
      <p className="is-pulled-left">beepboop ✏️ &copy; {year}</p>
      <p className="is-pulled-right">
        <a className="mx-2" href="/about">About</a>&nbsp;<strong>-</strong>&nbsp;
        <a className="mx-2" href="https://github.com/mapsam/beepboop" target="_blank">Source</a>&nbsp;<strong>-</strong>&nbsp;
        <a className="ml-2" href="/tos">Terms of service</a>
      </p>
    </div>
    );
  };

export default Footer;