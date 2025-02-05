import { all } from 'redux-saga/effects';
import eventWithCodeSaga from './eventWithCodeSaga';
import contactFormSaga from './contactFormSaga';
import registerUserSaga from './registerUserSaga';
import loginUserSaga from './loginSaga';
import loginWithGoogleSaga from './loginWithGoogleSaga';
import addTransactionSaga from './addTransactionSaga';

function* rootSaga() {
    yield all([
        eventWithCodeSaga(),
        contactFormSaga(),
        registerUserSaga(),
        loginUserSaga(),
        loginWithGoogleSaga(),
        addTransactionSaga()
    ]);
}
export default rootSaga;
