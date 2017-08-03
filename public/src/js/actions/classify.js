import * as ActionTypes from '../constants/actiontypes';

export const initClassify = () => dispatch => {
    return {
        type: ActionTypes.INITCLASSIFY,
        payload: {
            data: []
        }
    }
}