//import
class CheckList extends Component {

  render() {
    let tasks = this.props.map((task) => {...});
    return (
      <div>
        <ul>{tasks}</ul>
        <input
        type="text" placeholder="Type then hit Enter to add a task"
        />
      </div>



    )
  }


}
