//import DragnDropContext
//import HTML5Backend




class Container extends Component {
 render() {
 return (
 <div>
 <Snack name='Chips'/>
 <Snack name='Cupcake'/>
 <Snack name='Donut'/>
 <Snack name='Doritos'/>
 <Snack name='Popcorn'/>
 <ShoppingCart/>
 </div>
 );
 }
}
export default DragDropContext(HTML5Backend)(Container);
