//...import
//snack dragndrop spec
/*
required: beginDrag
optional: endDrag, canDrag, isDragging

*/
const snackSpec = {
  beginDrag(props) {
    return {
      name:props.name
    };
  },

  endDrag(props,monitor){
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if(dropResult){
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
    }
  }
},

      //dragsource collect function
/*
connect: instance of dragsourceconnector
monitor:install of dragsourcemonitor
we can use it to connect state from the react dnd to our component properties
function available we can use : canDrag(),isDragging(),getItemType(),getItem(),didDrop(),etc
*/

  let collect = (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }


class Snack extends Component {
  render() {
    //get name of snacks via props
    const {name} = this.props;



    return (
      connectDragSource(
      <div>
      {name}//from via props
      </div>
        )

    );
  }





}
//propTypes do not forget:)
export default DragSource('snack',snackSpec,collect)(Snack);
