import {
  REQUEST_CARDS,
  RECEIVE_CARDS,
  REQUEST_CREATE_CARD,
  RECEIVE_CREATE_CARD,
  TOGGLE_CARD_DETAILS,
  REQUEST_UPDATE_CARD,
  RECEIVE_UPDATE_CARD,
  UPDATE_CARD_POSITION,
  UPDATE_CARD_STATUS,
  REQUEST_PERSIST_CARD_DRAG,
  RECEIVE_PERSIST_CARD_DRAG,
  CREATE_DRAFT,
  UPDATE_DRAFT,
} from '../constants';

import KanbanAPI from '../api/KanbanApi';
import {throttle} from '../utils';
import {getCard, getCardIndex} from '../reducers';

let CardActionCreators = {
    //fetchcards
    fetchCards() {
    return (dispatch) => {
      dispatch({ type: REQUEST_CARDS });
      KanbanAPI.fetchCards().then(
        (cards) => dispatch({ type: RECEIVE_CARDS, success:true, cards }),
        (error) => dispatch({ type: RECEIVE_CARDS, success:false, error })
      );
    };
  },
    
    
    //toggleCarddetails
    
    
    
    //addcard
    
    
    
    
    //updatecard
    
    
    
    
    //updatecardstatus
    
    
    
    
    //updatecardposition
    
    
    
    
    
    
    //persistcarddrag
    
    
    
    
    
    
    
    
    
}