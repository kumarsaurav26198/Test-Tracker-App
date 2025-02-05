import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../../Themes/Colors';
import { BG_ray } from '../../assets/svg';

const { height } = Dimensions.get('window');

const BackgroundContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <View style={[styles.backgroundLayer, styles.greenBackground]}>
        <BG_ray style={{top:-40, right:-40,  position:"absolute"}}/>
      </View>
      <View style={[styles.backgroundLayer, styles.bottomContainer]} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

export default BackgroundContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  backgroundLayer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  greenBackground: {
    backgroundColor: Colors.black,
    top: 0,
    height: height / 2,
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
   
  },
  bottomContainer: {
    bottom: 0,
  },
  content: {
    // flex: 1,
    zIndex: 2,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
