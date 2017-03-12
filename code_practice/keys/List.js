//import
class List extends Component {
  render() {
    let cards = this.props.cards.map((card) => {
      return <Card
              key={card.id}
              />
    });
    return (
      <div>
        {cards}//from let cards....
      </div>
    )
  }



}
