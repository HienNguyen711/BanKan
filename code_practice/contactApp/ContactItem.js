//import .....


class ContactItem extends Component {

  render() {
    return (
      <li>
      //we have name from ContactList component via props
        {this.props.name} - {this.props.email}
      </li>

    );



  }

}

ContactItem.propTypes = {
  name:PropTypes.string.isRequired,
  email:PropTypes.string.isRequired

}
