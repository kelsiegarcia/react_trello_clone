class List extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { items: [] };  
  }

  componentWillMount(){
    // todo: make a ajax call to grab all the lists items
    // on success - set state of all the items
  }

  render() {
    let items = this.state.items.map( item => {
      // this should be a new component
      return(<h3>{item.name}</h3>)
    });
    return(
      <div>
        <div className="col s12 m6" onClick={() => this.props.showList(this.props)} >
          <div className="card white-grey darken-1">
            <div className="card-content red-text">
              <span className="card-title">{this.props.name}</span>
              <p>{this.props.description}</p>
              <hr />
                {items}
            </div>
            <div className="card-action">
              <button className='btn'>Edit List</button>
              <button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete List</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}