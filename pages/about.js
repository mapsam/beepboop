import Link from 'next/link';

const About = ({ days }) => (
  <div className="content has-text-primary">
    <h1 className="has-text-weight-bold title has-text-primary">About</h1>
    <p><i>Schmeep schmoop!</i></p>
    <p>
      Beepboop is a project created and maintained by <Link href="http://mapsam.com">Sam Matthews</Link>. The goal is to provide a space for writing <i>every</i> day, no matter what.
    </p>

    <p>
      You may wonder why you'd use this website and not a journal or just a simple Google doc. Honestly that's a really good question. Sometimes you gotta just build the tool for yourself, though.
    </p>

    <p>
      <span className="has-text-weight-bold underline">Why is it called beepboop?</span> Originally, this project was called "Day" or "Day project", which definitely makes more sense than beepboop. But once it was time to start branding and writing, the word <i>day</i> was just kind of boring. Beepboop is vague, cute, and kind of sounds like a tiny robot. Plus it's a small sound that represents a single entry in this application. Additionally, beepboop rhymes with meepmoop and bleepbloop.
    </p>

    <p>
      <span className="has-text-weight-bold underline">How can I provide feedback?</span> Jump on over to <Link href="https://github.com/mapsam/beepboop">GitHub</Link> to view the source code and add some comments.
    </p>

    <p>
      <span className="has-text-weight-bold underline">How can I get involved?</span> Ditto.
    </p>
  </div>
);

export default About;
