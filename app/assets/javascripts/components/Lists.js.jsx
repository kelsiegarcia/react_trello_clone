class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [], show: false };
    this.showList = this.showList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.updateList = this.updateList.bind(this)
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
      Materialize.toast('Could not GET lists', 4000)
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

  updateList(id, name) {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${id}`,
      type: 'PUT',
      data: { list: { name } }
    }).success( list => {
      let lists = this.state.lists;
      let editList = lists.find( l => l.id === list.id);
      editList.name = list.name;
      editList.description = list.description;
      this.setState({
        lists: [
          { ...editList},
          ...lists
        ]
      });
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
      Materialize.toast('List Not Saved', 4000);
    }) 
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List boardId={this.props.boardId} key={`list-${list.id}`} {...list} updateList={this.updateList} deleteList={this.deleteList} showList={this.showList}/>);
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