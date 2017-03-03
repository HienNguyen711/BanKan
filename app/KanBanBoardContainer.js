import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

//api url
const API_URL = 'http://kanbanapi.pro-react.com';
CONST API_HEADERS = {
    'Content-Type':'application/json',
    Authorization:'hiennguyen'
};

class KanBanBoardContainer extends Component {

    //constructor()
    constructor(){
        super(...arguments);
        this.state = {
            cards: []
        };
        
    
    }
    
    
    //some function or life cycle
    componentDidMount() {
        fetch(API_URL+'/cards',{headers:API_HEADERS})
            .then((res) => res.json())
            .then((data) => {
            this.setState({
                cards:data
            });
        })
            .catch((err) => {

            console.error(`Error fetching and parsing data ${err}`);
        });
    
    }
    //addTask
    addTask(cardId,taskName){
        //keep the ref to the original state 
        let prevState = this.state;
        //find the index of card 
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        //create a new task with the given name and a id 
        let newTask = {
            id:Data.now(),
            name:taskName,
            done:false
        };
        //create a new object and push the new task to the array of tasks
        let nextState = update(this.state.cards, {
            [cardIndex]:{
                tasks: {$push:[newTask] }
            }
        });
        
        //set the component state to the mutated obj
        this.setState({
            cards:nextState
        });
        //call the api to add the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks`,{
            method:'post',
            headers:API_HEADERS,
            body:json.stringify(newTask)
        })
            .then((res) => {
            if(res.ok) {
                return res.json()
            }
            else {
                throw new Error('Server response has some problem');
            }
        })
            .then((resData) => {
            //when the server returns the definitive id used for the new task on the server update it on React
            newTask.id = resData.id
            this.setState({
                cards:nextState
            });
        })
            .catch((err) => {
            this.setState(prevState);
        })
        
        
        
        
        
        
        
        
    }
    
    
    
    
    
    
    
    //render
    render() {
        return (
            <KanBanBoard 
            cards={this.state.cards}
            taskCallbacks={{
            toggle:this.toggleTask.bind(this),
            delete:this.deleteTask.bind(this),
                add:this.addTask.bind(this)
            }}
            
            />
        
        )
    }
}


export default KanBanBoardContainer;