import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const registerReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.REGISTER_USER:
            // console.warn("REGISTER_USER Reducers", ActionTypes.REGISTER_USER);
            // console.log("REGISTER_USER Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.REGISTER_USER_SUCCESS:
            // console.warn("REGISTER_USER_SUCCESS Reducers", ActionTypes.REGISTER_USER_SUCCESS);
            // console.warn("REGISTER_USER_SUCCESS Reducers action===>", action?.payload);
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case ActionTypes.REGISTER_USER_FAILURE:
            // console.warn("REGISTER_USER_FAILURE Reducers", ActionTypes.REGISTER_USER_FAILURE);
            // console.log("REGISTER_USER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
