import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    googleloading: false,
    error: null,
};


export const loginReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.LOGIN_REQUEST:
            // console.warn("LOGIN_REQUEST Reducers", ActionTypes.LOGIN_REQUEST);
            console.log("LOGIN_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.LOGIN_REQUEST_RESTART:
            // console.warn("LOGIN_REQUEST Reducers", ActionTypes.LOGIN_REQUEST);
            console.log("LOGIN_REQUEST_RESTART Reducers action===>",);
            return {
                ...state,
                loading: false,
                error: null,
                googleloading: false,
            };
        case ActionTypes.LOGIN_REQUEST_SUCCESS:
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers", ActionTypes.LOGIN_REQUEST_SUCCESS);
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers action===>", action.currentUser);
            return {
                ...state,
                data: action.user,
                loading: false,
            };
        case ActionTypes.LOGIN_REQUEST_FAILURE:
            // console.warn("LOGIN_REQUEST_FAILURE Reducers", ActionTypes.LOGIN_REQUEST_FAILURE);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionTypes.LOG_OUT_REQUEST:
            console.warn("LOG_OUT_REQUEST ", ActionTypes.LOG_OUT_REQUEST);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action);
            return {
                ...state,
                data: null,
                loading: false,
                error: null,
            };

        case ActionTypes.LOGIN_WITH_GOOGLE_REQUEST:
            console.log("Login Request Reducers action===>");
            return {
                ...state,
                googleloading: true,
                error: null,
            };

        case ActionTypes.LOGIN_WITH_GOOGLE_SUCCESS:
            console.log("Login Success Reducers action===>", action.payload);
            return {
                ...state,
                data: action.payload, // Stores user data from Firebase or Google Sign-In
                googleloading: false,
                error: null,
            };

        case ActionTypes.LOGIN_WITH_GOOGLE_FAILURE:
            console.log("Login Failure Reducers action===>", action.error);
            return {
                ...state,
                googleloading: false,
                error: action.error,
            };


        default:
            return state;
    }
};
