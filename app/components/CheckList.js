import React, { Component } from 'react';

class CheckList extends Component {
    
    checkInputKeyPress(e){
        if(e.key === 'Enter'){
            this.props.taskCallbacks.add(this.props.cardId,e.target.value);
            e.target.value='';
        }
    }
    
    
    
  render() {
    let tasks = this.props.tasks.map((task,taskIndex) => (
     <li>
        //checkbox
        <input 
            type="checkbox"
            checked={task.done}
            onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId,task.id, taskIndex) }
        />
        //task name
            {task.name}{' '}
                                     
        //remove anchor button
        <a href="#"
            className="checklist__task--remove"
            onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id,taskIndex )} />
                                     
   
     </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input 
            type="text"
            placeholder="Add a task and hit Enter"
            className="checklist--add-task"
            onKeyPress={this.checkInputKeyPress.bind(this)}
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default CheckList;