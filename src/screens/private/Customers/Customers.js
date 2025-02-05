// 

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';

const Customers = () => {
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [{ translateY: withTiming(containerTranslateY.value, { duration: 1700 }) }],
    };
  });

  useEffect(() => {
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Animated.View style={[ animatedTextContainerStyle]}>
        <C_Text text_title="All Customers" />
        {/* <C_Text text_desc={`Here's what's happening with\nyour store today.`} /> */}
      </Animated.View>
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bgColor
  },
  textContainer: {
    // padding: 10, 
  },
});
