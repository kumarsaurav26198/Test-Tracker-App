import React, {useEffect} from 'react';
import {StyleSheet, View, Alert, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {C_Text, CustomButton, Header} from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {logOutRequest} from '../../../store/redux/action/authActions';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, {duration: 1700}),
      transform: [
        {translateY: withTiming(containerTranslateY.value, {duration: 1700})},
      ],
    };
  });
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, {duration: 1700}),
      transform: [
        {translateY: withTiming(containerTranslateY.value, {duration: 1700})},
      ],
    };
  });
  useEffect(() => {
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
  }, []);

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ],
    );
  };

  const deleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        console.log(`Deleting user with ID: ${userId}`);
        await user.delete();

        await dispatch(logOutRequest());

        Alert.alert(
          'Account Deleted',
          'Your account has been successfully deleted.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.closeDrawer();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SignIn'}],
                });
              },
            },
          ],
        );
      } else {
        Alert.alert('Error', 'No user is logged in.');
      }
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert('Error', 'Please log in again to delete your account.');
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Animated.View style={[styles.textContainer, animatedTextContainerStyle]}>
        <C_Text text_title="Settings" />
      </Animated.View>
      <Animated.View style={[animatedButtonStyle, {alignItems: 'center'}]}>
        <CustomButton
          title="Delete Account"
          onPress={confirmDeleteAccount}
          color={Colors.danger}
          marginTop={100}
        />
      </Animated.View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  textContainer: {
    padding: 10,
  },
});
