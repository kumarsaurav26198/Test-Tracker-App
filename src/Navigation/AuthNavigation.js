import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Checkout, ContactUs, Customers, Details, EditTranscation, Home, ManageReviews, Orders, Product, Settings } from '../screens/private';
import { SignIn, SignUp } from '../screens/public';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthNavigation = ({ loginRes }) => {
  const screenOptions = {
    headerShown: false,
  };
  const isLoggedIn = loginRes?.data && loginRes?.data?.uid;

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'SignIn'} 
      screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Customers" component={Customers} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="EditTranscation" component={EditTranscation} />
      <Stack.Screen name="ManageReviews" component={ManageReviews} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  loginRes: state.loginReducers,
});

export default connect(mapStateToProps)(AuthNavigation);
