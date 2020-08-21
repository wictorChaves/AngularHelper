import { Action }     from '@ngrx/store';
import { UserLogged } from 'src/app/models/user-logged.interface';

export enum ActionTypes {
    LOGIN_LOGIN  = '[Login] Login',
    LOGIN_LOGOUT = '[Login] Logout'
}

export class Login implements Action {
    readonly type: string = ActionTypes.LOGIN_LOGIN;
    constructor(public payload: UserLogged) { }
}

export class Logout implements Action {
    readonly type: string = ActionTypes.LOGIN_LOGOUT;
    constructor(public payload: UserLogged = null) { }
}

export type ActionsUnion = Login | Logout;