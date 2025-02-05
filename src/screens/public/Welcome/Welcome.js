import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { FontsWeights } from '../../../Themes/Fonts';

const Welcome = () => {
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1500 });
    slideUp.value = withTiming(0, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const animatedSubtitleStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/animation /welcome.json')} 
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <Animated.View style={[styles.textContainer, animatedTitleStyle]}>
        <Text style={styles.title}>Welcome to Our App!</Text>
        <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
          Let's get started with your journey.
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', 
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight:FontsWeights.FW500,
    color: '#333', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
