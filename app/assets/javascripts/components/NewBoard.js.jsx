class NewBoard extends React.Component {
  constructor(props) {
  super(props)
}

  addBoard(e) {
    // prevent the default form submit from happening
    e.preventDefault();
    // make ajax call to create a new board
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { board: {name: this.refs.name.value, description: this.refs.description.value }},
      dataType: 'JSON'
    }).done( board => {
      this.props.addBoard(board);
      this.refs.addForm.reset();
    }).fail( response => {
      alert(response.errors.toString());
    });

    // clear out form or show errors
  }

  render() {
    return (
      <div className='col s12 m10 offset-m1 center'>
        <h4>Add New Board</h4>
        <form ref='addForm' onSubmit={this.addBoard.bind(this)}>
          <input type='text' placeholder='Board Name' ref='name' required />
          <textarea placeholder='Board Description' ref='description'></textarea>
          <input type ='submit' className='btn' />
        </form>
      </div>
    )
  }
}