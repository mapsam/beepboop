const underlineStyle = {
  textDecoration: 'underline'
}

const Account = ({ days }) => {
  return (
    <section class="hero has-background-info py-6">
      <div class="hero-body is-family-monospace">
        <div class="container">
          <h1 class="title has-text-grey-dark">
            What did you do today?
          </h1>
          <h2 class="subtitle has-text-white">
            <strong class="has-text-white" style={underlineStyle}>Day</strong> is a simple, private, personal journal<br />
            designed to bring clarity to your life.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Account;
