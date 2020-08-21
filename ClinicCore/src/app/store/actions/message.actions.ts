import { Action } from '@ngrx/store';
import { Message } from 'src/app/models/message.model';

export enum ActionTypes {
    MESSAGE_SUCCESS = '[Message] Success',
    MESSAGE_ERROR = '[Message] Error'
}

export class MessageSuccess implements Action {
    readonly type: string = ActionTypes.MESSAGE_SUCCESS;
    constructor(public payload: Message) { }
}

export class MessageError implements Action {
    readonly type: string = ActionTypes.MESSAGE_ERROR;
    constructor(public payload: Message) { }
}


export type ActionsUnion = MessageSuccess | MessageError;