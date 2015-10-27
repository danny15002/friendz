var GenericList = React.createClass({
  componentDidMount: function () {
    window.addEventListener('mousedown', this.hide);
  },
  render: function () {
    return (
      <div>
        <ul>
          {this.props.list.map(function (item) {
            return <ul key={item.id}>item</ul>
          })}
        </ul>
      </div>
    )
  }
});
