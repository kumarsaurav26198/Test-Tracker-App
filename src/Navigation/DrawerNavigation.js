import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SideBarText } from '../component/appComponent';
import { CrossIcon } from '../assets/svg';
import AuthNavigation from './AuthNavigation';

const Drawer = createDrawerNavigator();
const screenOptions = {
  headerShown: false,
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AuthNavigation"
      drawerContent={(drawerProps) => (
        <View style={styles.drawerContent}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => drawerProps.navigation.closeDrawer()}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <SideBarText navigation={drawerProps.navigation} />
        </View>
      )}
    >
      <Drawer.Screen name="AuthNavigation" component={AuthNavigation} options={{...screenOptions}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerContent: {
    height: '100%',
    width: '100%',
    paddingTop: 30,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
