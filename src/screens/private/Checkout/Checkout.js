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

  const printRighthand = () => {
    let numOfRows = 5;
    let result = '';

    for (let index = 1; index <= numOfRows; index++) {
      let row = '';
      for (let j = 0; j < index; j++) {
        row += '* ';
      }
      result += row + '\n';   
    }

    return result;
  };
  const printLefthandTriangle = () => {
    let numOfRows = 5; 
    let result = '';

    for (let index = 1; index <= numOfRows; index++) {
      let row = '';
      for (let j = 1; j <= numOfRows - index; j++) {
        row += '  '; // Add spaces to shift stars to the right
      }
      for (let k = 1; k <= index; k++) {
        row += '* '; // Add stars
      }
      result += row + '\n'; // Add a new line after each row
    }

    return result;
  };
  const countNumber = () => {
    const numbers = [];
    for (let index = 0; index < 6; index++)
    {
      numbers.push(index);
    }
    return numbers.join(', ');
  };

  const rectangle = () => {
    let n = 4;
    let star = '';
    for (let index = 0; index < n; index++)
    {
      for (let j = 0; j < n; j++)
      {
        star += '*';
      }
      star += '\n';
    }
    return star;
  };

  const triangle = () => {
    let n = 5;
    let star = '';
    for (i = 1; i <= n; i++)
    {
      for (j = 0; j < i; j++)
      {
        star += '*';
      }
      star += '\n';
    }
    return star;
  };

  const downTriangle = () => {
    let n = 5;
    let star = '';
    for (i = 4; i >= 0; i--)
    {
      for (j = 0; j <= i; j++)
      {
        star += '*';
      }
      star += '\n';
    }
    return star;
  };

  const rightHandTriangle = () => {
    let n = 5;
    let star = '';
    for (let i = 1; i <= n; i++)
    {
      // printing spaces
      for (let j = 0; j < n - i; j++)
      {
        star += ' ';
      }
      // printing star
      for (let k = 0; k < i; k++)
      {
        star += '*';
      }
      star += '\n';
    }
    return star;
  };

  //  console.log(cba)
  const numberPattern = () => {
    let n = 5;
    let star = '';
    for (i = 1; i <= 5; i++)
    {
      for (j = 0; j < i; j++)
      {
        star += '*';
      }
      star += '\n';
    }
    return star;
  };
  const printNum = () => {
    let rows = 5;
    let value = '';
    for (let index = rows; index >= 1; index--)
    {
      for (let j = index; j >= 1; j--)
      {
        value += j + ' ';
      }
      if (index > 1)
      {
        value += '\n';
      }
    }
    return value;
  };

  const addArryElement = () => {
    let a = [ 1, 2, 3, 4, 5, 7, 7 ];
    let arryLenght = a.length;
    let sum = 0;
    for (let index = 0; index < arryLenght; index++)
    {
      sum += a[ index ];
    }
    return sum;
  };
  const factorial = (num) => {
    for (let index = num - 1; index >= 1; index--)
    {
      num = num * index;
    }
    return num;
  };
  function vowelsAndConsonants(str) {
    let convertToLower = str.toLowerCase();
    for (let index = 0; index < convertToLower.length; index++)
    {
    }
    return convertToLower;
  }
  function capitalizeFirstLetter(str) {
    if (str.length === 0)
    {
      return str;
    } else
    {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
  return (
    <View style={styles.container}>
      <Header />
      <Animated.View style={[ styles.textContainer, animatedTextContainerStyle ]}>
        <C_Text text_title="PrintNum" />
        <C_Text text_title={numberPattern()} />
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
  startext: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    left: 20
  }
});
