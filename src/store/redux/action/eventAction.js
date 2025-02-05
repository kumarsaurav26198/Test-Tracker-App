import { ActionTypes } from "../constants/actiontypes";

export const fetchEventRequest = () => ({
  type: ActionTypes.FECTH_EVENT_REQUEST,
});

export const addTransaction = (payload) => ({
  type: ActionTypes.ADD_TRANSACTION_SUCCESS,
  payload: {
    ...payload,
    date: new Date(payload.date).toISOString(),
  },
});

export const deleteTransaction = (payload) => ({
  type: ActionTypes.DELETE_TRANSACTION_SUCCESS,
  payload,
});

export const updateTransaction = (payload) => ({
  type: ActionTypes.EDIT_TRANSACTION_SUCCESS,
  payload: {
    ...payload,
    date: new Date(payload.date).toISOString(),
  },
});
