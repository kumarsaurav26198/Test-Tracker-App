import { takeEvery, put, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { ActionTypes } from '../redux/constants/actiontypes';
import {  reset } from '../../service/navigationService';


function* loginUser({ payload }) {
  const { email, password} = payload;
  try {
    const userCredential = yield call(
      [auth(), 'signInWithEmailAndPassword'],
      email,
      password
    );
    const user = userCredential.user;
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
    // console.log("serializableUser=======>", serializableUser);
    yield put({ type: ActionTypes.LOGIN_REQUEST_SUCCESS, user: serializableUser });
    reset([ { name: 'Home' } ]);
  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';
    // Handle specific Firebase Authentication error codes
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Authentication credential is incorrect.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is invalid.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'The email address is already in use.';
    }

    const errorPayload = {
      message: errorMessage,
      code: error.code || null, // Firebase error code
    };

    console.log("errorPayload==>", errorPayload);
    yield put({ type: ActionTypes.LOGIN_REQUEST_FAILURE, error: errorPayload });
  }
}

function* loginUserSaga() {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, loginUser);
}

export default loginUserSaga;
