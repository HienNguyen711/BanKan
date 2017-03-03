import React, {
    Component
}
from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
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
    toggleTask(cardId, taskId,taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        //save the reference to the task's done value
        let newDoneValue;
        //$apply to change the done value to not done value
        let nextState = update(
            this.state.cards, {
                [cardIndex] : {
                    tasks: {
                        [taskIndex]:{
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
            cards:nextState
        });
        //call the api to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method:'put',
            headers:API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
            .then((res) => {

            if(!res.ok) {
                throw new Error('Server respons has error');
            }
        })
            .catch((err) => {
            console.error(`Fetch error ${err}`);
            this.setState(prevState);
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

            />

        )
    }
}


export default KanBanBoardContainer;