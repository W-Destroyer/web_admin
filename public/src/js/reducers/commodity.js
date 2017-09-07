import * as ActionTypes from '../constants/actiontypes';
import * as _ from 'lodash';
const initialState = {
    classify: {
        isFetching: false,
        invalidate: false,
        message: '',
        isEdit: false,
        changeId: -1,
        data: []
    },

    product: {
        isFetching: false,
        invalidate: false,
        message: '',
        data: {
            list: [],
            total: 0
        }
    },
    
    addProduct: {
        isFetching: false,
        invalidate: false,
        message: '',
        saveSuccessful: false,
        data: {}
    },
    
    deleteProduct: {
        isFetching: false,
        invalidate: false,
        message: '',
        deleteSuccessful: false
    }
}

export default function commodity(state = initialState, action) {
    var newState = _.cloneDeep(state);
    var cloneAction = _.cloneDeep(action);

    newState.classify = classifyReducer(state.classify, cloneAction);
    newState.product = productReducer(state.product, cloneAction);
    newState.addProduct = addProductReducer(state.addProduct, cloneAction);

    return newState;
}

function classifyReducer(state, action) {
    switch(action.type) {
        // 发送异步请求
        case ActionTypes.CLASSIFYFETCH:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 异步请求失败
        case ActionTypes.CLASSIFYFETCH_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 初始化产品分类列表
        case ActionTypes.CLASSIFY_INIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 添加产品分类
        case ActionTypes.CLASSIFY_ADD:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 编辑产品分类
        case ActionTypes.CLASSIFY_EDIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        // 保存产品分类
        case ActionTypes.CLASSIFY_SAVE:
            var cloneState = _.cloneDeep(state);

            var changeData = cloneState.data.find(item => {
                if (item['t_id'] !== action.payload.data['t_id'])
                    return false;
                Object.assign(item, action.payload.data);
                return true;
            });
            if (!changeData)
                cloneState.data.push(action.payload.data);
            Object.keys(action.payload).forEach(key => {
                if (key === 'data')
                    return;
                cloneState[key] = action.payload[key];
            });
            return cloneState;

        // 删除产品分类
        case ActionTypes.CLASSIFY_DELETE:
            var classifyData = state.data.filter(item => {
                return !action.payload.ids.filter(id => {
                    return item['t_id'] === id;
                })
            });
            return Object.assign({}, state, {
                ...action.payload
            }, {
                data: classifyData
            });

        // 关闭产品分类Modal
        case ActionTypes.CLASSIFY_MODAL_CANCEL: 
            return Object.assign({}, state, {
                ...action.payload
            });
            
        // 清除message等信息
        case ActionTypes.CLASSIFY_NOTIFY_CLEAR: 
            return Object.assign({}, state, {
                ...action.payload
            })

        default:
            return state;
    }
}

function productReducer(state, action) {
    switch(action.type) {
        case ActionTypes.INITPRODUCTLIST:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITPRODUCTLIST_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.INITPRODUCTLIST_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}

function addProductReducer(state, action) {
    switch(action.type) {
        case ActionTypes.ADDPRODUCT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.ADDPRODUCT_SUCCESS:
            return Object.assign({}, state, {
                ...action.payload
            });
        case ActionTypes.ADDPRODUCT_FAILURE:
            return Object.assign({}, state, {
                ...action.payload
            });

        case ActionTypes.ADDPRODUCTFINISHED:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}