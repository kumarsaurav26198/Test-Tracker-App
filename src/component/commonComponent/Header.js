import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Hamburger, SubstanceIcon } from '../../assets/svg';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native'; 

const Header = () => {
  const navigation = useNavigation();
  const headerCardHeight = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerCardHeight.value,
    };
  });

  useEffect(() => {
    headerCardHeight.value = withTiming(50, { duration: 600 });
  }, []);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // Function to open drawer
  };
  return (
    <Animated.View style={[ styles.container, headerStyle ]}>
      <TouchableOpacity style={styles.leftContent} onPress={openDrawer}>
        <Hamburger />
      </TouchableOpacity>
      <View style={styles.centerContent}>
        <SubstanceIcon />
        <Text style={styles.text}>Expense Tracker</Text>
      </View>
      <View style={styles.rightContent} />
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    // paddingBottom: 10,
    backgroundColor: Colors.bgColor,
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightContent: {
    flex: 1,
  },
  text: {
    marginLeft: 10,
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
});
