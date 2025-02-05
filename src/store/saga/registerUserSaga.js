import { takeEvery, put, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { ActionTypes } from '../redux/constants/actiontypes';
import { navigate } from '../../service/navigationService';

function* registerUser({ payload }) {
  console.log("REGISTER_USER===Saga");
  try {
    const { email, password ,name} = payload;

    const userCredential = yield call(
      [auth(), 'createUserWithEmailAndPassword'],
      email,
      password
    );
    const userInfo = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
    yield call([userCredential.user, 'updateProfile'], { displayName: name });
    yield put({ type: ActionTypes.REGISTER_USER_SUCCESS, payload: userInfo });
    navigate("SignIn")

  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'The email address is already in use.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is invalid.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak. Please enter a stronger password.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    }

    const errorPayload = {
      message: errorMessage,
      code: error.code || null,
    };

    // console.log("errorPayload==>", errorPayload);

    yield put({ type: ActionTypes.REGISTER_USER_FAILURE, error: errorPayload });
  }
}

function* registerUserSaga() {
  yield takeEvery(ActionTypes.REGISTER_USER, registerUser);
}

export default registerUserSaga;
