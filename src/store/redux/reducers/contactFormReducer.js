


import { ActionTypes } from '../constants/actiontypes';
const initialState = {
    data: [],
    loading: false,
    error: null,
  };

export const contactFormReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.SUBMIT_CONTACT_FORM_REQUEST:
            // console.warn("SUBMIT_CONTACT_FORM_REQUEST Reducers", ActionTypes.SUBMIT_CONTACT_FORM_REQUEST);
            // console.log("SUBMIT_CONTACT_FORM_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.SUBMIT_CONTACT_FORM_SUCCESS:
            // console.warn("SUBMIT_CONTACT_FORM_SUCCESS Reducers", ActionTypes.SUBMIT_CONTACT_FORM_SUCCESS);
            // console.log("SUBMIT_CONTACT_FORM_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action.responseData,
                loading: false,
            };
        case ActionTypes.SUBMIT_CONTACT_FORM_FAILURE:
            // console.warn("SUBMIT_CONTACT_FORM_FAILURE Reducers", ActionTypes.SUBMIT_CONTACT_FORM_FAILURE);
            // console.log("SUBMIT_CONTACT_FORM_FAILURE Reducers action===>", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ActionTypes.SUBMIT_CONTACT_FORM_RESET:
            // console.warn("SUBMIT_CONTACT_FORM_FAILURE Reducers", ActionTypes.SUBMIT_CONTACT_FORM_FAILURE);
            // console.log("SUBMIT_CONTACT_FORM_RESET Reducers action===>", action);
            return {
                data: [],
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};
