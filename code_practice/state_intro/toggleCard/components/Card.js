//import

class Card extends Component {
  constructor() {
    super(props);
    this.state = {//set the default state for showDetails
      showDetails:false
    };
  }

  handleShowDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    })

  }

  //render
  render() {
    let cardDetails;//declare cardDetails
    if(this.state.showDetails) {
      cardDetails = (
        <div className="card_details">
          {this.props.description}
        <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
        </div>

      );
    }
    return (
      <div className="card">
        <div onClick={this.handleShowDetails}>{this.props.title}</div>
        {cardDetails}//from cardDetails above if state showDetails is true
      </div>


    )
  }



}

//code improve from the book code examples: create handleShowDetails()
