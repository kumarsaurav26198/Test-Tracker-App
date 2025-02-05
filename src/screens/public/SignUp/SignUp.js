import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Alert, Text } from 'react-native';
import { Auth_Title, BackgroundContainer, SocialLogin } from '../../../component/appComponent';
import { CustomButton, CustomTextInput } from '../../../component/commonComponent';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../../../Themes/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FontsFamilies, FontSize, FontsWeights } from '../../../Themes/Fonts';
import { connect, useDispatch } from 'react-redux';
import { registerRequest } from '../../../store/redux/action/authActions';

const SignUp = ({navigation,registerRes}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const formHeight = useSharedValue(0);

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: formHeight.value,
    };
  });

  useEffect(() => {
    formHeight.value = withTiming(verticalScale(350), { duration: 2000 });
  }, []);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input) => {
    return input.length >= 6;
  };

  const validateName = (input) => {
    return input.trim() !== '';
  };

  const handleNameChange = (input) => {
    setName(input);
    setErrorName(!validateName(input));
  };

  const handleEmailChange = (input) => {
    setEmail(input);
    setErrorEmail(!validateEmail(input));
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    setErrorPassword(!validatePassword(input));
  };

  const handleSignUp = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid) {
      setErrorName(true);
    }
    if (!isEmailValid) {
      setErrorEmail(true);
    }

    if (!isPasswordValid) {
      setErrorPassword(true);
    }

    if (isNameValid && isEmailValid && isPasswordValid) {
      const payload = {
        email: email,
        password: password,
        name: name
      };
      await dispatch(registerRequest(payload));
      // registerRequest
      // Alert.alert('Success', 'Signed up successfully!');
    }
  };

  return (
    <BackgroundContainer>
      <Auth_Title headerText="Hello, welcome back!" titleText="Complete your Signup" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: verticalScale(120) }} />
        {/* Apply animated style to the form container */}
        <Animated.View style={[styles.scrollViewContent, formAnimatedStyle]}>
          <CustomTextInput
            placeholder="Enter name"
            value={name}
            onChangeText={handleNameChange}
            borderColor={errorName ? 'red' : Colors.lightgrey}
            error={errorName}
            errorMessage={errorName ? 'Please enter a name' : null}
          />
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
            secureTextEntry={true}
            borderColor={errorPassword ? 'red' : Colors.lightgrey}
            error={errorPassword}
            errorMessage={errorPassword ? 'Password must be at least 6 characters' : null}
          />
                 {registerRes?.error ? (
            <Text
              style={styles.errorText}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              {registerRes?.error?.message}
            </Text>
          ) : null}
          <CustomButton title="Sign Up" onPress={handleSignUp} marginTop={verticalScale(20)} loading={registerRes?.loading} />
          <Text style={styles.text} onPress={() => { navigation.navigate("SignIn") }}>Already have an account? Login</Text>
        </Animated.View>
        <SocialLogin/>
      </ScrollView>
    </BackgroundContainer>
  );
};
const mapStateToProps = state => ({
  registerRes: state.registerReducers,
});
export default connect(mapStateToProps)(SignUp);

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(20), // Ensure enough padding for the CustomButton
    borderRadius: moderateScale(20),
    backgroundColor: Colors.white,
    borderColor: Colors.lightgrey,
    borderWidth: moderateScale(0.6),
    // marginBottom: verticalScale(100),
    overflow: 'hidden',
  },
  text: {
    textAlign: "center",
    color: Colors.blue,
    fontWeight: FontsWeights.FW600,
    fontFamily: FontsFamilies.regular,
    fontSize: FontSize.FS16,
  },
  errorText: {
    textAlign: "left",
    color: Colors.red,
    left: 20,
    fontWeight: FontsWeights.FW600,
    fontFamily: FontsFamilies.regular,
    fontSize: FontSize.FS12,
  },
});
