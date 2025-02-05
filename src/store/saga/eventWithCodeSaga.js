import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../service/apiEndPoints';
import { ActionTypes } from '../redux/constants/actiontypes';

function* eventWithCodeApiCall() {
  const URL = `${baseURL}${apiUri.auth.allposts}`; 
  console.log("API URL:", URL);

  try {
    const response = yield call(axios.get, URL);
    const responseData = response.data;
  // console.log("responseData===>",JSON.stringify(responseData,null,2))

    yield put({ type: ActionTypes.FECTH_EVENT_SUCCESS, responseData });
  } catch (error) {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null,
      response: error?.response ? {
        status: error.response.status,
        data: error.response.data,
        config: {
          method: error.response.config?.method,
          url: error.response.config?.url,
        },
      } : null,
    };
    yield put({ type: ActionTypes.FECTH_EVENT_FAILURE, error: errorPayload });
  }
}

function* eventWithCodeSaga() {
  yield takeEvery(ActionTypes.FECTH_EVENT_REQUEST, eventWithCodeApiCall);
}

export default eventWithCodeSaga;
