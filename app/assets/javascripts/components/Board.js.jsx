class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBoard = this.updateBoard.bind(this);

  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  updateBoard() {
    // todo
  }
  edit(){}
    render() {
      return(
        <div>
          <div className="col s12 m6">
            <div className="card white-grey darken-1">
              <div className="card-content red-text">
                <input placeholder={this.props.name} defaultValue={this.props.name} ref="name" required={true}/>
                <input placeholder={this.props.description} defaultValue={this.props.description} ref="description" />
              </div>

              <div className="card-action">
                <button onClick={this.toggleEdit} className="btn blue">Edit</button>
                <button onClick={this.toggleEdit} className="btn blue">Cancel</button>
                <button onClick={this.updateBoard} className="btn">Save</button>
              </div>
            </div>
          </div>
        </div>
      )
    }  
  }
}

