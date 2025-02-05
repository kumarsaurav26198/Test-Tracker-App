import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  C_Text,
  CustomButton,
  CustomTextInput,
  Header,
  MobileWithCountryCode,
} from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import { connect, useDispatch } from 'react-redux';
import { submitContactFormRequest } from '../../../store/redux/action/contactUsAction';

const ContactUs = ({ contactusRes }) => {
  console.log(contactusRes);
  const dispatch = useDispatch();
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ selectedCountryCode, setSelectedCountryCode ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ message, setMessage ] = useState('');

  const [ errorFirstName, setErrorFirstName ] = useState(false);
  const [ errorLastName, setErrorLastName ] = useState(false);
  const [ errorEmail, setErrorEmail ] = useState(false);
  const [ errorPhone, setErrorPhone ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState(false);

  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [
        { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) },
      ],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [
        { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) },
      ],
    };
  });

  useEffect(() => {
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
  }, []);

  const validateInputs = () => {
    let valid = true;
    if (!firstName)
    {
      setErrorFirstName(true);
      valid = false;
    } else
    {
      setErrorFirstName(false);
    }
    if (!lastName)
    {
      setErrorLastName(true);
      valid = false;
    } else
    {
      setErrorLastName(false);
    }
    if (!email)
    {
      setErrorEmail(true);
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email))
    {
      setErrorEmail(true);
      valid = false;
    } else
    {
      setErrorEmail(false);
    }
    if (!phone)
    {
      setErrorPhone(true);
      valid = false;
    } else
    {
      setErrorPhone(false);
    }
    if (!message)
    {
      setErrorMessage(true);
      valid = false;
    } else
    {
      setErrorMessage(false);
    }
    return valid;
  };
  const handleCountryChange = code => {
    setSelectedCountryCode(code);
  };

  const handleSendMessage = () => {
    if (validateInputs())
    {
      const payload = {
        fname: firstName,
        lname: lastName,
        phone: `${ selectedCountryCode }${ phone }`,
        email: email,
        message: message,
      };
      console.log(payload);
      dispatch(submitContactFormRequest(payload));
      // dispatch({ type: 'SEND_CONTACT_FORM', payload: { firstName, lastName, email, phone, message } });

      // setFirstName('');
      // setLastName('');
      // setEmail('');
      // setPhone('');
      // setMessage('');

      // Alert.alert('Message Sent', 'Your message has been sent successfully.');
    } else
    {
      // Handle form validation errors
      setErrorMessage(true); // Assuming this is for overall form validation
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={[ 1 ]} // Adjusted to an array with a single item for FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Animated.View
            style={[ animatedTextContainerStyle, styles.textContainer ]}>
            <C_Text text_title="Contact Us" />
          </Animated.View>
        }
        renderItem={() => (
          <View style={{ marginTop: 10, padding: 20 }}>
            <CustomTextInput
              placeholder={'First Name'}
              value={firstName}
              onChangeText={setFirstName}
              borderColor={errorFirstName ? 'red' : null}
            />
            {errorFirstName && (
              <Text style={styles.errorText}>Enter first name</Text>
            )}
            <CustomTextInput
              placeholder={'Last Name'}
              value={lastName}
              onChangeText={setLastName}
              borderColor={errorLastName ? 'red' : null}
            />
            {errorLastName && (
              <Text style={styles.errorText}>Enter last name</Text>
            )}
            <MobileWithCountryCode
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your mobile number"
              onCountryChange={handleCountryChange}
              borderColor={errorPhone ? 'red' : null}
            />
            {errorPhone && (
              <Text style={styles.errorText}>Enter a valid phone number</Text>
            )}
            <CustomTextInput
              placeholder={'Email'}
              marginTop={20}
              value={email}
              onChangeText={setEmail}
              borderColor={errorEmail ? 'red' : null}
            />
            {errorEmail && (
              <Text style={styles.errorText}>
                {email ? 'Enter a valid email' : 'Enter email'}
              </Text>
            )}
            <CustomTextInput
              placeholder={'Message'}
              marginTop={20}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              borderColor={errorMessage ? 'red' : null}
            />
            {errorMessage && (
              <Text style={styles.errorText}>Enter your message</Text>
            )}
          </View>
        )}
      />

      <Animated.View
        style={[
          animatedButtonStyle,
          { alignItems: 'center' },
        ]}>
        <CustomButton
          title={'Send Message'}
          marginTop={30}
          onPress={handleSendMessage}
          loading={contactusRes?.loading}
        />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = state => ({
  contactusRes: state?.contactFormReducer,
});

export default connect(mapStateToProps)(ContactUs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  textContainer: {
    paddingVertical: 20,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 10,
    // paddingHorizontal: 20,
  },
});
