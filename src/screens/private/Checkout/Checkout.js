import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';


const Checkout = () => {
  const buttonRef = useRef(null);

  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(containerOpacity.value, { duration: 1700 }),
      transform: [ { translateY: withTiming(containerTranslateY.value, { duration: 1700 }) } ],
    };
  });

  useEffect(() => {
    containerOpacity.value = 1;
    containerTranslateY.value = 0;
  }, []);

  function handleClick() {
    console.log(buttonRef.current);
  }
  
  // const printRighthand = () => {
  //   let numOfRows = 5;
  //   let result = '';
  
  //   for (let index = 1; index <= numOfRows; index++) {
  //     let row = '';
  //     for (let j = 0; j < index; j++) {
  //       row += '* ';
  //     }
  //     result += row + '\n';   
  //   }
  
  //   return result;
  // };
  // const printLefthandTriangle = () => {
  //   let numOfRows = 5; 
  //   let result = '';
  
  //   for (let index = 1; index <= numOfRows; index++) {
  //     let row = '';
  //     for (let j = 1; j <= numOfRows - index; j++) {
  //       row += '  '; // Add spaces to shift stars to the right
  //     }
  //     for (let k = 1; k <= index; k++) {
  //       row += '* '; // Add stars
  //     }
  //     result += row + '\n'; // Add a new line after each row
  //   }
  
  //   return result;
  // };
  
  return (
    <View style={styles.container}>
      <Header />
      <Animated.View style={[ styles.textContainer, animatedTextContainerStyle ]}>
        <C_Text text_title="Techostinger" />
        {/* <Text style={styles.startext}>{printRighthand()}</Text> */}
        {/* <Text style={styles.startext}>{printLefthandTriangle()}</Text> */}
        {/* <Button
          onPress={handleClick}
          ref={buttonRef}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}


      </Animated.View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor
  },
  textContainer: {
    padding: 10,
  },
  startext:{
    fontSize:24,
    color:"#000",
    fontWeight:"bold",
    left:20
  }
});
