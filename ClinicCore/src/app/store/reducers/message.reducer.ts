import { Message } from 'src/app/models/message.model';
import { ActionsUnion, ActionTypes } from '../actions/message.actions';
import { newState } from '../helper/NewState';

const defaultState: Message = null;

export function MessageReducer(state: Message = defaultState, action: ActionsUnion): Message {

    switch (action.type) {
        case ActionTypes.MESSAGE_SUCCESS:
            action.payload.type = "success"
            return newState(state, action.payload)

        case ActionTypes.MESSAGE_ERROR:
            action.payload.type = "error"
            return newState(state, action.payload)
    }
}