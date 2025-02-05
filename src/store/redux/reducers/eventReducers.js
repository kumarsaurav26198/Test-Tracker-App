import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  

export const eventReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FECTH_EVENT_REQUEST:
            // console.warn("FETCH_EVENT_REQUEST Reducers", ActionTypes.FETCH_EVENT_REQUEST);
            // console.log("FETCH_EVENT_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FECTH_EVENT_SUCCESS:
            console.warn("FECTH_EVENT_SUCCESS Reducers", ActionTypes.FECTH_EVENT_SUCCESS);
            // console.log("FECTH_EVENT_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action?.responseData,
                loading: false,
            };
        case ActionTypes.FECTH_EVENT_FAILURE:
            // console.warn("FECTH_EVENT_FAILURE Reducers", ActionTypes.FECTH_EVENT_FAILURE);
            // console.log("FECTH_EVENT_FAILURE Reducers action===>", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};