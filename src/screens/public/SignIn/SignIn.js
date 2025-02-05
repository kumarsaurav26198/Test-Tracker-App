import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Auth_Title, BackgroundContainer, SocialLogin } from '../../../component/appComponent';
import { CustomButton, CustomTextInput } from '../../../component/commonComponent';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../../../Themes/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FontsFamilies, FontSize, FontsWeights } from '../../../Themes/Fonts';
import { loginRequest, loginRequestResfresh, loginWithGoogle } from '../../../store/redux/action/authActions';
import { connect, useDispatch } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { reset } from '../../../service/navigationService';


const SignIn = ({ navigation, loginRes }) => {
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorEmail, setErrorEmail ] = useState(false);
  const [ errorPassword, setErrorPassword ] = useState(false);

  useEffect(() => {
    dispatch(loginRequestResfresh());
  }, [ dispatch ]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '661336601774-ju310jhlcqv4618fj48vep4159dn03hd.apps.googleusercontent.com',
      scopes: [ 'profile', 'email' ],
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try
    {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;

      if (!idToken)
      {
        idToken = signInResult.idToken;
      }

      if (!idToken)
      {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const firebaseUser = await auth().signInWithCredential(googleCredential);


      // You can now handle the user data after Firebase login
      const userData = {
        uid: firebaseUser.user.uid,
        email: firebaseUser.user.email,
        displayName: firebaseUser.user.displayName,
        photoURL: firebaseUser.user.photoURL,
      };
      dispatch(loginWithGoogle(userData));
      reset([ { name: 'Home' } ]);

    } catch (error)
    {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_CANCELLED ? 'Sign-in cancelled by user' :
          error.code === statusCodes.IN_PROGRESS ? 'Sign-in is in progress' :
            error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE ? 'Google Play Services not available' :
              'An unexpected error occurred';

      console.error('Google Sign-In Error:', errorMessage);
    }
  };


  const formHeight = useSharedValue(0);
  const formAnimatedStyle = useAnimatedStyle(() => ({ height: formHeight.value }));

  useEffect(() => {
    formHeight.value = withTiming(verticalScale(300), { duration: 2000 });
  }, []);

  const validateEmail = input => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const validatePassword = input => input.length >= 6;

  const handleEmailChange = input => {
    setEmail(input);
    setErrorEmail(!validateEmail(input));
  };

  const handlePasswordChange = input => {
    setPassword(input);
    setErrorPassword(!validatePassword(input));
  };

  const handleLogin = async () => {
    setErrorEmail(!validateEmail(email));
    setErrorPassword(!validatePassword(password));

    if (validateEmail(email) && validatePassword(password))
    {
      dispatch(loginRequest({ email, password }));
    }
  };

  return (
    <BackgroundContainer>
      <Auth_Title headerText="Login to continue" titleText="Hello, welcome back!" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: verticalScale(120) }} />
        <Animated.View style={[ styles.scrollViewContent, formAnimatedStyle ]}>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            borderColor={errorEmail ? 'red' : Colors.lightgrey}
            error={errorEmail}
            errorMessage={errorEmail ? 'Please enter a valid email' : null}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            showPasswordToggle
            onChangeText={handlePasswordChange}
            secureTextEntry
            borderColor={errorPassword ? 'red' : Colors.lightgrey}
            error={errorPassword}
            errorMessage={errorPassword ? 'Password must be at least 6 characters' : null}
          />
          {loginRes?.error && <Text style={styles.errorText}>{loginRes.error.message}</Text>}

          <CustomButton title="Log In" onPress={handleLogin} marginTop={40} loading={loginRes?.loading} />
          <Text style={styles.text} onPress={() => navigation.navigate('SignUp')}>
            Create a new account ?
          </Text>
        </Animated.View>
        <SocialLogin handleGoogleSignIn={handleGoogleSignIn} />
      </ScrollView>
    </BackgroundContainer>
  );
};

const mapStateToProps = state => ({ loginRes: state.loginReducers });
export default connect(mapStateToProps)(SignIn);

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.white,
    borderColor: Colors.lightgrey,
    borderWidth: moderateScale(0.6),
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    color: Colors.blue,
    fontWeight: FontsWeights.FW600,
    fontFamily: FontsFamilies.regular,
    fontSize: FontSize.FS16,
  },
  errorText: {
    textAlign: 'left',
    color: Colors.red,
    fontWeight: FontsWeights.FW600,
    fontFamily: FontsFamilies.regular,
    fontSize: FontSize.FS12,
  },
});
