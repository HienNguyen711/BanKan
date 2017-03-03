import React, {
    Component
}
from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import {
    throttle
}
from './utils';
import 'whatwg-fetch';
import 'babel-polyfill';

//api url
const API_URL = 'http://kanbanapi.pro-react.com';
CONST API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'hiennguyen'
};

class KanBanBoardContainer extends Component {

    //constructor()
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        };
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
    }


    //some function or life cycle
    componentDidMount() {
            fetch(API_URL + '/cards', {
                    headers: API_HEADERS
                })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        cards: data
                    });
                })
                .catch((err) => {

                    console.error(`Error fetching and parsing data ${err}`);
                });

        }
        //addTask
    addTask(cardId, taskName) {
        //keep the ref to the original state 
        let prevState = this.state;
        //find the index of card 
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        //create a new task with the given name and a id 
        let newTask = {
            id: Data.now(),
            name: taskName,
            done: false
        };
        //create a new object and push the new task to the array of tasks
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });

        //set the component state to the mutated obj
        this.setState({
            cards: nextState
        });
        //call the api to add the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
                method: 'post',
                headers: API_HEADERS,
                body: json.stringify(newTask)
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Server response has some problem');
                }
            })
            .then((resData) => {
                //when the server returns the definitive id used for the new task on the server update it on React
                newTask.id = resData.id
                this.setState({
                    cards: nextState
                });
            })
            .catch((err) => {
                this.setState(prevState);
            });


    }

    //delete task 

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        // Create a new object without the task
        let nextState = update(this.state.cards, {
      [cardIndex]: {
                tasks: {
                    $splice: [[taskIndex, 1]]
                }
            }
        });
        // set the component state to the mutated object
        this.setState({
            cards: nextState
        });
        // Call the API to remove the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
                method: 'delete',
                headers: API_HEADERS
            })
            .then((response) => {
                if (!response.ok) {

                    throw new Error("Server response wasn't OK")
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error)
                this.setState(prevState);
            });
    }

    //toggleTask
    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        //save the reference to the task's done value
        let newDoneValue;
        //$apply to change the done value to not done value
        let nextState = update(
            this.state.cards, {
                [cardIndex]: {
                    tasks: {
                        [taskIndex]: {
                            done: {
                                $apply: (done) => {

                                    newDoneValue = !done
                                    return newDoneValue
                                }
                            }
                        }
                    }
                }
            }



        );
        //set the component state to mutated obj
        this.setState({
            cards: nextState
        });
        //call the api to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
                method: 'put',
                headers: API_HEADERS,
                body: JSON.stringify({
                    done: newDoneValue
                })
            })
            .then((res) => {

                if (!res.ok) {
                    throw new Error('Server respons has error');
                }
            })
            .catch((err) => {
                console.error(`Fetch error ${err}`);
                this.setState(prevState);
            });


    }
    
    //updateCardStatus
    updateCardStatus(cardId,listId){
        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Get the current card
    let card = this.state.cards[cardIndex]
    // Only proceed if hovering over a different list
    if(card.status !== listId){
      // set the component state to the mutated object
      this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
      }));
    }
  }
    //updateCard Position
    updateCardPosition(cardId , afterId){
    // Only proceed if hovering over a different card
    if(cardId !== afterId) {
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
      // Get the current card
      let card = this.state.cards[cardIndex]
      // Find the index of the card the user is hovering over
      let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
      // Use splice to remove the card and reinsert it a the new index
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }
    
    //persistCardDrag
     persistCardDrag (cardId, status) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Get the current card
    let card = this.state.cards[cardIndex]

    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: card.status, row_order_position: cardIndex})
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error);
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      );
    });
  }

    
    
    
    
    
    
    
    

    //render
    render() {
        return ( < KanBanBoard cards = {
                this.state.cards
            }
            taskCallbacks = {
                {
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }
            }
            cardCallBacks={{
                           
                updateStatus:this.updateCardStatus,
                updatePosition:this.updateCardPosition,
                persistCardDrag:this.persistCardDrag.bind(this)
              }}

            />

        )
    }
}


export default KanBanBoardContainer;