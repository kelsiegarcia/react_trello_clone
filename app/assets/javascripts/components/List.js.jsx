class List extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { items: [], editing: false };
    this.editState = this.editState.bind(this);
    this.displayState = this.displayState.bind(this);
    this.updateState = this.updateState.bind(this);

  }

  componentWillMount() {
    $.ajax({
      url: `/items`,
      type: 'GET'
    }).success( items => {
      this.setState({ items: items })
    }).fail( error => {
      console.log(error)
    })
  }

  editState() {
    this.setState({ editing: true })
  }

  displayState() {
    this.setState()
  }

  updateState() {
    this.setState({ editing: false})
  }

  render() {
    let items = this.state.items.map( item => {
      return(<Item key={`item-${item.id}` } {...item} />)
    })
    if(this.state.editing === true) {
      return(
        <div className="col s12 m6">
          <div className="card white-grey darken-1">
            <div className="card-content red-text">
              <span className="card-title"></span>
              <form>
              <input defaultValue={this.props.name} ref='name' />
              <button className='btn blue' onClick={ () => this.props.updateList(this.props.id, this.refs.name.value)}>update list</button>
              <button className='btn red' onClick={this.displayState}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return( 
        <div className="card-action col m6">
          <p>List Name: {this.props.name}</p>
          <div className='col m2'>
            <ul>
              {items}
            </ul>
          </div>
          <button className='btn blue' onClick={this.editState}>Edit</button>
        </div>
      )
    }
  }
}
