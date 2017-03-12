//import
class ContactsApp extends Component {

  constructor() {
    super();//no props here because we dont get any props from any higher component
    this.setState = {

      filterText: ''
    };
  }

  handleUserInput(searchTerm) {
    this.setState({
      filterText:searchTerm
      //immutable needs to take notice here??
    })
  }




  render() {
    <div>
      <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
      <ContactList contact={this.state.props.contacts} filterText={this.state.filterText}/>


    </div>


  }

}

ContactsApp.propTypes = {
  contacts:PropTypes.arrayOf(PropTypes.object);
}



//this is the Contacts app that we will built as an example for learning props and state
//Structure of components
/*
-ContactsApp
  --SearchBar
  --ContactList
      --ContactItem



*/
