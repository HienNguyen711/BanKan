import {
    REQUEST_CREATE_TASK,
    RECEIVE_CREATE_TASK,
    REQUEST_DELETE_TASK,
    RECEIVE_DELETE_TASK,
    REQUEST_TOGGLE_TASK,
    RECEIVE_TOGGLE_TASK
}
from '../constants';
import KanbanAPI from '../api/KanbanApi';

let TaskActionCreators = {
    addTask(cardId, task) {
            return (dispatch) => {
                dispatch({
                    type: REQUEST_CREATE_TASK,
                    cardId,
                    task
                });
                KanbanAPI.addTask(cardId, task).then(
                    (receivedNewTask) => dispatch({
                        type: RECEIVE_CREATE_TASK,
                        success: true,
                        cardId,
                        task: receivedNewTask,
                        temporaryTaskId: task.id
                    }), (error) => dispatch({
                        type: RECEIVE_CREATE_TASK,
                        success: false,
                        cardId,
                        temporaryTaskId: task.id,
                        error
                    })
                )
            };
        },



        //editTask





        //deleteTask




        //dragndrop task



        //toggletask





}