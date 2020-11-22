import Content from './Content';

const Footer = props => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <section class="footer has-background-light">
      <Content>
        <div class="content has-text-centered">
          <p>
            <a class="has-text-grey-dark mx-2" href="/about">About</a>&nbsp;<strong>·</strong>&nbsp;
            <a class="has-text-grey-dark mx-2" href="https://github.com/mapsam/beepboop" target="_blank">Source</a>&nbsp;<strong>·</strong>&nbsp;
            <a class="has-text-grey-dark mx-2" href="/tos">Terms of service</a>
          </p>
          <p class="block"><strong>🤖 Beepboop &copy; {year}</strong></p>
        </div>
      </Content>
    </section>
    );
  };

export default Footer;