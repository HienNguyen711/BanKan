import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';

class KanbanBoard extends Component {
  render(){
    return (
      <div className="app">
        <List id='todo'
              title="To Do"
              cards={this.props.cards.filter((card) => card.status === "todo")}
              taskCallbacks={this.props.taskCallbacks}
              cardCallbacks={this.props.cardCallbacks}
              
        />
        <List id='in-progress'
              title="In Progress"
              cards={this.props.cards.filter((card) => card.status === "in-progress")} 
              taskCallbacks={this.props.taskCallbacks}
              cardCallbacks={this.props.cardCallbacks}
        />
        <List id='done'
              title='Done'
              cards={this.props.cards.filter((card) => card.status === "done")} 
              taskCallbacks={this.props.taskCallbacks}
              cardCallbacks={this.props.cardCallbacks}
        />
      </div>
    );
  }
};



//set PropTypes 
KanbanBoard.propTypes = {
    cards:PropTypes.arrayOf(PropTypes.object),
    taskCallbacks:PropTypes.object
};

export default KanbanBoard;