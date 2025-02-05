import { takeEvery, put, call } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ActionTypes } from '../redux/constants/actiontypes';
import { reset } from '../../service/navigationService';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '661336601774-ju310jhlcqv4618fj48vep4159dn03hd.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

function* loginWithGoogle() {
  try {
    // Step 1: Check if Google Play services are available
    yield GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Step 2: Sign out from any previous session
    const res = yield GoogleSignin.signOut();
    // console.log('Successfully signed out from previous sessions:', res);

    // Step 3: Sign in with Google
    const { idToken, user } = yield GoogleSignin.signIn();
    console.log('Google Sign-In successful:', user);

    // Step 4: Create Firebase credentials
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('Creating Firebase credentials from Google token...');

    // Step 5: Sign in with Firebase credentials
    console.log('Signing in with Firebase credentials...',googleCredential);
    // const firebaseUser = yield call(() => auth().signInWithCredential(googleCredential));
    // console.log('Firebase user signed in successfully:', firebaseUser);

    // if (firebaseUser && firebaseUser.user) {
    //   // Step 6: Fetch and structure user data
    //   const userData = {
    //     uid: firebaseUser.user.uid,
    //     email: firebaseUser.user.email,
    //     displayName: firebaseUser.user.displayName,
    //     photoURL: firebaseUser.user.photoURL,
    //   };

    //   console.log('User data fetched successfully:', userData);

    //   // Step 7: Dispatch success action
    //   yield put({ type: ActionTypes.LOGIN_REQUEST_SUCCESS, user: userData });
      
    //   // Step 8: Navigate to Home screen
    //   reset([{ name: 'Home' }]);
    // } else {
    //   console.error('Firebase user data is missing.');
    //   yield put({
    //     type: ActionTypes.LOGIN_REQUEST_FAILURE,
    //     error: 'Firebase user data is missing',
    //   });
    // }
  } catch (error) {
    // Step 9: Handle any errors during the process
    console.error('Login failed with error:', error.message || 'Google Sign-In failed');
    yield put({
      type: ActionTypes.LOGIN_REQUEST_FAILURE,
      error: error.message || 'Google Sign-In failed',
    });
  }
}

// Watcher saga
function* loginWithGoogleSaga() {
  yield takeEvery(ActionTypes.LOGIN_WITH_GOOGLE_REQUEST, loginWithGoogle);
}

export default loginWithGoogleSaga;