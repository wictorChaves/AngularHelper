import { Action } from '@ngrx/store';

export enum ActionTypesPost {
    EDIT_TEXT = '[Post] Edit',
    UPVOTE = '[Post] Upvote',
    DOWNVOTE = '[Post] Downvote',
    RESET = '[Post] Reset'
}

export class EditText implements Action {
    readonly type: string = ActionTypesPost.EDIT_TEXT;
    constructor(public payload: string) { }
}

export class Upvote implements Action {
    readonly type: string = ActionTypesPost.UPVOTE;
    constructor(public payload: any = null) { }
}

export class Downvote implements Action {
    readonly type: string = ActionTypesPost.DOWNVOTE;
    constructor(public payload: any = null) { }
}

export class Reset implements Action {
    readonly type: string = ActionTypesPost.RESET;
    constructor(public payload: any = null) { }
}

export type ActionsUnionPost = Upvote | Downvote | Reset | EditText;