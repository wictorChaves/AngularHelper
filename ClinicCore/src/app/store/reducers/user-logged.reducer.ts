import { ActionsUnion, ActionTypes } from '../actions/user-logged.actions';
import { UserLogged } from 'src/app/models/user-logged.interface';
import { newState } from '../helper/NewState';

const defaultState: UserLogged = null;

export function LoginReducer(state: UserLogged = defaultState, action: ActionsUnion): UserLogged {

    switch (action.type) {
        case ActionTypes.LOGIN_LOGIN:
            return newState(state, action.payload)

        case ActionTypes.LOGIN_LOGOUT:
            return null
    }
}