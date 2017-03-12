//import .....



class ContactList extends Component {

  render() {
    //get list of contacts that match with the filterText
    let filteredContacts = this.props.contacts.filter((contact) => contact.name.indexOf(this.props.filterText) !== -1)
    return (
      <div>
        <ul>
      //props via contacts from ContactsApp component
          {filteredContacts.map(contact) =>
          <ContactItem key={contact.email} name={...} email={...}

          }
        </ul>

      </div>

    )

  }

}
ContactList.propTypes = {
  contacts:PropTypes.arrayOf(PropTypes.object)


};
