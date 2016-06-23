class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [], show: false };
    this.showList = this.showList.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  showList(list) {
    this.setState({ show: true, list })
  }

  componentWillMount() {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'GET',
      dataType: 'JSON'      
    }).done( lists => {
      this.setState({ lists })
    }).fail( data => {
      // todo: handle this better
      alert('Failed grabbing board lists')
    });
  }

  deleteList(id) {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done ( data => {
      let lists = this.state.lists;
      let index = lists.findIndex( l => l.id === id);
      this.setState({
        lists: [
          ...lists.slice(0, index),
          ...lists.slice(index + 1, lists.length)
        ]
      })
    }).fail (data => {
      alert('List did not delete')
    });
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'POST',
      data: { list: { name: this.refs.name.value } },
      dataType: 'JSON'
    }).done( list => {
      this.refs.addList.reset();
      this.setState({ lists: [{...list}, ...this.state.lists ] })
    }).fail( data => {
      // to do: handle this better
      alert('List not saved.');
    }) 
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List key={`list-${list.id}`} {...list} deleteList={this.deleteList} showList={this.showList}/>);
    });
    return(
      <div>
        <form onSubmit={this.addList.bind(this)} ref='addList'>
        <input type='text' ref='name' placeholder='List Name' required />
        <input type='submit' className='btn' value='Add' />
        </form>
        {lists}
      </div>
    );
  }
}