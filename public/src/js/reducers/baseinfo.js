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
        isFetching: false,
        invalidate: false,
        message: '',
        isEdit: false,
        changeId: -1,
        data: [],
    }
}


export default function baseinfo(state = initialState, action) {

    var newState = Object.assign({}, state);

    newState.name = companyNameReducer(state.name, action);
    newState.friendLink = friendLinkReducer(state.friendLink, action);

    return newState;
}

function companyNameReducer(state, action) {

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

function friendLinkReducer(state, action) {
    switch(action.type) {
        case ActionTypes.INITFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.INITFRIENDLINK_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.INITFRIENDLINK_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            })

        case ActionTypes.EDITFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.ADDFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            })

        case ActionTypes.SAVEFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.SAVEFRIENDLINK_SUCCESS:
            var id = action.payload.data['s_id'];
            var newState = Object.assign({}, state);
            var editData = newState.data.find(item => item['s_id'] === id)
            if (!!editData) {
                editData['s_name'] = action.payload.data['s_name'];
                editData['s_value'] = action.payload.data['s_value'];
            } else {
                newState.data.push(action.payload.data)
            }
            newState.isFetching = action.payload.isFetching;
            newState.isEdit = action.payload.isEdit;

            return newState;
        case ActionTypes.SAVEFRIENDLINK_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.DELFRIENDLINK:
            return Object.assign({}, state, {
                ...action.payload
            })
        case ActionTypes.DELFRIENDLINK_SUCCESS:
            var newState = Object.assign({}, state);
            var index = action.payload.id;
            newState.data.splice(index, 1);
            newState.isFetching = action.payload.isFetching;
            return newState;
        case ActionTypes.DELFRIENDLINK.FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            })
        default: 
            return state;
    }

}
