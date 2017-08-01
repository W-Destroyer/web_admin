// import { SHOWMODAL, HIDEMODAL, ADDFRIENDLINK, EDITFRIENDLINK, BASEINFO } from '../actions/baseinfo';
import * as ActionTypes from '../constants/actiontypes';

const initialState = {
    name: {
        isEdit: false,
        isFetching: false,
        invalidate: false,
        message: '',
        data: ''
    },

    friendLink: {
        list: [{
            key: '0',
            name: '淘宝',
            address: 'https://www.taobao.com',
        }, {
            key: '1',
            name: '天猫',
            address: 'https://www.tmall.com',
        }],
        showModal: false,
        changeId: -1,
    }
}


export default function (state = initialState, action) {

    var newState = Object.assign({}, state);

    newState.name = namedCompany(state.name, action);
    newState.friendLink = friendLink(state.friendLink, action);

    return newState;

    switch(action.type) {
        case ActionTypes.INITCOMPANYNAME:
            var newState = Object.assign({}, state);
            newState.name.isFetching = action.isFetching;
            return newState;
        case ActionTypes.INITCOMPANYNAME_SUCCESS:
            var newState = Object.assign({}, state);
            newState.name.isFetching = action.isFetching;
            newState.name.data = action.data;
            return newState;
        case ActionTypes.INITCOMPANYNAME_FAILUER:
            var newState = Object.assign({}, state)
            newState.name.isFetching = action.isFetching;
            newState.name.invalidate = action.invalidate;
            newState.name.message = action.data;
            return newState;

        // case ActionTypes.EDITCOMPANYNAME:
        //     var newState = Object.assign({}, state);



        case ActionTypes.SHOWMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.changeId = action.changeId;
            return newState;
        case ActionTypes.HIDEMODAL:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            return newState;
        case ActionTypes.ADDFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list.push(action.data);
            return newState;
        case ActionTypes.EDITFRIENDLINK:
            var newState = Object.assign({}, state)
            newState.friendLink.showModal = action.showModal;
            newState.friendLink.list[action.changeId] = action.data;
            return newState;
        default:
            return state;
    }
}

function namedCompany(state, action) {

    switch(action.type) {
        // 初始化公司名称
        case ActionTypes.INITCOMPANYNAME:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITCOMPANYNAME_SUCCESS: 
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITCOMPANYNAME_FAILUER:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.EDITCOMPANYNAME:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 保存公司名称
        case ActionTypes.SAVECOMPANYNAME:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.SAVECOMPANYNAME_SUCCESS: 
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.SAVECOMPANYNAME_FAILUER:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;

    }
}

function friendLink(state, action) {
    switch(action.type) {
        case ActionTypes.SHOWMODAL:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.HIDEMODAL:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.ADDFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.EDITFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;

    }
}
