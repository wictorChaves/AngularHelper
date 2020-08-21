import { Post } from "./post.model";
import { ActionTypesPost, ActionsUnionPost } from './post.actions';

const defaultState: Post = {
    text: 'Hello. I am the default post',
    likes: 0
}

const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}

export function postReducer(state: Post = defaultState, action: ActionsUnionPost) {

    switch (action.type) {
        case ActionTypesPost.EDIT_TEXT:
            return newState(state, { text: action.payload })

        case ActionTypesPost.UPVOTE:
            return newState(state, { likes: state.likes + 1 })

        case ActionTypesPost.DOWNVOTE:
            return newState(state, { likes: state.likes - 1 })

        case ActionTypesPost.RESET:
            return defaultState
    }
}