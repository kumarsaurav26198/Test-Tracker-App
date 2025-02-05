
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { C_Text, Header } from '../../../component/commonComponent';
import Colors from '../../../Themes/Colors';
import { connect } from 'react-redux';
import AllTransctionContainer from '../../../container/AllTransctionContainer';

const Orders = ({transactionRes}) => {
  // console.log("transactionRes",JSON.stringify(transactionRes,null,2))
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
        <C_Text text_title="All Transactions" />
      </Animated.View>
        <AllTransctionContainer/>
    </View>
  );
};

const mapStateToProps = state => ({
  transactionRes: state?.transactionReducers,
});

export default connect(mapStateToProps)(Orders);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bgColor
  },
  textContainer: {
    // padding: 10, 
  },
});
