import { ActionTypes } from "../constants/actiontypes";

export const loginRequest = (payload) => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload: payload
});
export const loginRequestResfresh = () => ({
    type: ActionTypes.LOGIN_REQUEST_RESTART,
});
export const  loginWithGoogle= (payload) => ({
    type: ActionTypes.LOGIN_WITH_GOOGLE_SUCCESS,
    payload: payload
});

export const registerRequest = (payload) => ({
    type: ActionTypes.REGISTER_USER,
    payload,
});

export const logOutRequest = () => ({
    type: ActionTypes.LOG_OUT_REQUEST,
});

