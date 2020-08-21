import { Action }  from '@ngrx/store';
import { Message } from 'src/app/models/message.model';

export enum ActionTypes {
    MESSAGE_LOGIN_SUCCESS = '[Message Login] Success',
    MESSAGE_LOGIN_ERROR   = '[Message Login] Error'
}

export class MessageLoginSuccess implements Action {
    readonly type: string = ActionTypes.MESSAGE_LOGIN_SUCCESS;
    constructor(public payload: Message) { }
}

export class MessageLoginError implements Action {
    readonly type: string = ActionTypes.MESSAGE_LOGIN_ERROR;
    constructor(public payload: Message) { }
}


export type ActionsUnion = MessageLoginSuccess | MessageLoginError;