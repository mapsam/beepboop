const Content = props => (
  <section className='section'>
    <div class="container is-max-desktop">
      {props.columns
        ? <div className="columns">{props.children}</div>
        : props.children
      }
    </div>
  </section>
);

export default Content;