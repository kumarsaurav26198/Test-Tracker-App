import { takeEvery, call, put, race, delay } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri } from '../../service/apiEndPoints';
import { ActionTypes } from '../redux/constants/actiontypes';
import { Alert } from 'react-native';
import { navigate } from '../../service/navigationService';
// import { showAnimatedToast } from '../action/animatedTostAction';

function* contactusApiCalls(action) {
    const { payload } = action;
    const fullUrl = `${apiUri.auth.contactform}`;
    console.log('contactusApiCalls Full URL===>: ', fullUrl);
    console.log('contactusApiCalls payload: ', payload);

    try {
        const { response, timeout } = yield race({
            response: call(axios.post, fullUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            timeout: delay(60000), 
        });

        if (timeout) {
            const errorPayload = {
                message: 'Request timed out. Please try again later.',
                status: null,
                response: null,
            };
            yield put({ type: ActionTypes.SUBMIT_CONTACT_FORM_FAILURE, error: errorPayload });
        } else {
            const responseData = response.data;
            yield put({ type: ActionTypes.SUBMIT_CONTACT_FORM_SUCCESS, responseData });
            yield put(Alert.alert('Sent successfully!', 'SUCCESS'));
            navigate("Home")
        }
    } catch (error) {
        // Catch other errors such as network issues, server errors, etc.
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
        yield put({ type: ActionTypes.SUBMIT_CONTACT_FORM_FAILURE, error: errorPayload });
    }
}

function* contactFormSaga() {
    yield takeEvery(ActionTypes.SUBMIT_CONTACT_FORM_REQUEST, contactusApiCalls);
}

export default contactFormSaga;
