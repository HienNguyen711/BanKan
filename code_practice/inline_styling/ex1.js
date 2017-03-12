//import

class HelloStyling extends Component {
  render() {
    let styles = {
      width:100,
      color:white,
      padding:5,
      backgroundColor: '#ee9900'
    };
  }
  return (
    <div style={styles}>Hello Styling in ReactJS</div>
  );





}

//Note: this is inline styling in React... In a big app, this is so stupid. There are some supported libs for styling
//in React such as Radium, or react-stylable package.
