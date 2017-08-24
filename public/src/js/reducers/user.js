import { USER } from '../actions/user';

const initialState = {
    id: '',
    username: '',
    nickname: '',
    lastLoginTime: '',
    userImg: ''
}

export default function userinfo(state = initialState, action) {
    switch(action.type) {
        case USER:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}