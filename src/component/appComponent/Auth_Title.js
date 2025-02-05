import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../Themes/Colors';
import { FontSize } from '../../Themes/Fonts';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function Auth_Title(props) {
  const { headerText, titleText } = props;

  // Shared values for animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // Animated style for the header
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // Animated style for the title
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // Trigger animation on mount
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1500 });
    translateY.value = withTiming(0, { duration: 1500 });
  }, []);

  return (
    <View style={styles.container}>
      {/* Apply animated styles */}
      <Animated.Text style={[styles.header, headerAnimatedStyle]}>
        {headerText}
      </Animated.Text>
      <Animated.Text style={[styles.title, titleAnimatedStyle]}>
        {titleText}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // marginBottom: moderateScale(20),
  },
  header: {
    color: Colors.white,
    fontSize: FontSize.FS28,
    marginTop: moderateScale(10),
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.FS18,
  },
});
