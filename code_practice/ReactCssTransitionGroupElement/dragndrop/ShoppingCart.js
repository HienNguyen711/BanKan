//import.....

//shoppingcart specs: for dragndrop
const shoppingcartSpects = {
  drop(){
    return {
      name:'ShoppingCart'
    };
  };

//hover: called when an item is hovered over the component
//canDrop:use to specify whether the drop target is able to accept the item

}
// shopping cart drop target - collect
/*
connect: instance of droptargetconnector- use it to assign the drop target role to a DOM node
monitor: an instance of droptargetmonitor
canDrop()----- isOver()----- didDrop()

*/

let collect = (connect,monitor) => {
  return {
    connectDropTarget:connect.dropTarget(),
    isOver:monitor.isOver(),
    canDrop:monitor.canDrop()


  }
}




class ShoppingCard extends Component {
  render() {
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;
    return (
      <div>

        {isActive?'Thanks for order':'Drag here to order'}


      </div>


   )




  }
}
//shopping card propTypes

export default DropTarget('snack',shoppingcartSpects,collect)(ShoppingCard);
