//import ......
//import fetch npm package
//this file deals with component lifecycle in the book
class ContactsAppContainer extends Component {
  constructor(){
    super();//of course no props is passed down from any higher component
    this.setState({
      contacts:[]
    });
  }


  componentDidMount() {
    fetch('./contact.json')
      .then((response) => response.json() )
      .then((resData) => {
      this.setState({contacts:resData});
    })
      .catch((err) => {
      console.error('Error when fetching data '+err);
    });



  }



  render() {
    return (

      <ContactsApp contacts={this.state.contacts}/>

    )





  }




}
