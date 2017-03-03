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