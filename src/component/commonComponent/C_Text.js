import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';

const C_Text = ({ text_title, text_desc, style }) => {
  return (
    <View style={styles.container}>
      {text_title && (
        <Text style={[styles.text_title, style]}>
          {text_title}
        </Text>
      )}
      {text_desc && (
        <Text style={styles.text_desc}>
          {text_desc}
        </Text>
      )}
    </View>
  );
};

export default C_Text;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15, 
  },
  text_title: {
    fontSize: FontSize.FS24, 
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
    marginBottom: 8, 
    marginTop:20
  },
  text_desc: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
});
