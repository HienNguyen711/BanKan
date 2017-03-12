//import
class ContactsApp extends Component {
  render() {
    <div>
      <SearchBar />
      <ContactList contact={this.state.props.contacts}/>


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
