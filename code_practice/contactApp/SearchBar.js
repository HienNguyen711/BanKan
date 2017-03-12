//import
//...

class SearchBar extends Component {

  handleChange(e) {

    this.props.onUserInput(e.target.value);//take the value of input withe onUserInput transfer via props from ContactsApp component


  }



  render() {

    return (
      <input type="search" placeholder="Search contact.."
      value={this.props.filterText}
      onChange={this.handleChange.bind(this)}
      />

    );

  }




}
SearchBar.propTypes = {
  onUserInput:PropTypes.func.isRequired,

  filterText:PropTypes.string.isRequired

}
