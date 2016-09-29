// class Items extends React.Component {
//   constructor(props) {
//   super(props);
//     this.state = { items: [] }
//     this.addItem = this.addItem.bind(this);
//   }
//
//   componentDidMount() {
//     $.ajax({
//       url: '/items',
//       type: 'GET',
//       data: { list_id: this.props.id}
//     }).done( items => {
//       this.setState({ items: items})
//     })
//   }
//
//
// }
