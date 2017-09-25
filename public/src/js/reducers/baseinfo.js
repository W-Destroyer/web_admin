import * as ActionTypes from '../constants/actiontypes';
import cloneDeep from '../utils/cloneDeep';

const initialState = {
    companyName: {
        isFetching: false,
        invalidate: false,
        saveSuccessful: false,
        message: '',
        isEdit: false,
        data: ''
    },

    friendLink: {
        isFetching: false,
        invalidate: false,
        saveSuccessful: false,
        message: '',
        isEdit: false,
        changeData: {id: -1},
        data: [],
    },
    author: ''
}


export default function baseinfo(state = initialState, action) {
    var newState = cloneDeep(state);
    var cloneAction = cloneDeep(action);

    newState.companyName = companyNameReducer(state.companyName, cloneAction);
    newState.friendLink = friendLinkReducer(state.friendLink, cloneAction);

    return newState;
}

function companyNameReducer(state, action) {

    switch(action.type) {
        // 异步请求
        case ActionTypes.COMPANYNAME_FETCH:
            return Object.assign({}, state, {
                ...action.payload
            })
        // 异步请求失败
        case ActionTypes.COMPANYNAME_FETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            })

        // 初始化公司名称
        case ActionTypes.COMPANYNAME_INIT:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.COMPANYNAME_EDIT:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.COMPANYNAME_SAVE:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.COMPANYNAME_DELETE:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.COMPANYNAME_EDIT_CANCLE:
            return Object.assign({}, state, {
                ...action.payload
            })

        case ActionTypes.COMPANYNAME_NOTIFY_CLEAR:
            return Object.assign({}, state, {
                ...action.payload
            })
        default:
            return state;

    }
}

function friendLinkReducer(state, action) {
    switch(action.type) {
        case ActionTypes.FRIENDLINK_FETCH:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_FETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_INIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_ADD: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_SAVE: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_EDIT: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_DELETE: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_MODAL_CANCEL: 
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.FRIENDLINK_NOTIFY_CLEAR: 
            return Object.assign({}, state, {
                ...action.payload
            });

        default:
            return state;

    }
    // switch(action.type) {
    //     case ActionTypes.INITFRIENDLINK:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.INITFRIENDLINK_SUCCESS:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.INITFRIENDLINK_FAILURE:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })

    //     case ActionTypes.EDITFRIENDLINK:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.ADDFRIENDLINK:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })

    //     case ActionTypes.SAVEFRIENDLINK:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.SAVEFRIENDLINK_SUCCESS:
    //         var id = action.payload.data['s_id'];
    //         var newState = Object.assign({}, state);
    //         var editData = newState.data.find(item => item['s_id'] === id)
    //         if (!!editData) {
    //             editData['s_name'] = action.payload.data['s_name'];
    //             editData['s_value'] = action.payload.data['s_value'];
    //         } else {
    //             newState.data.push(action.payload.data)
    //         }
    //         newState.isFetching = action.payload.isFetching;
    //         newState.isEdit = action.payload.isEdit;

    //         return newState;
    //     case ActionTypes.SAVEFRIENDLINK_FAILURE:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.DELFRIENDLINK:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     case ActionTypes.DELFRIENDLINK_SUCCESS:
    //         var newState = Object.assign({}, state);
    //         var index = action.payload.id;
    //         newState.data.splice(index, 1);
    //         newState.isFetching = action.payload.isFetching;
    //         return newState;
    //     case ActionTypes.DELFRIENDLINK_FAILURE:
    //         return Object.assign({}, state, {
    //             ...action.payload
    //         })
    //     default: 
    //         return state;
    // }

}
