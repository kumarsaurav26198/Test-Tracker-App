import { ActionTypes } from "../constants/actiontypes";

export const submitContactFormRequest = (payload) => ({
    type: ActionTypes.SUBMIT_CONTACT_FORM_REQUEST,
    payload,
  });