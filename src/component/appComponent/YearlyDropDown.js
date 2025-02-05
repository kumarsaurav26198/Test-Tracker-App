import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Dropdow } from '../../assets/svg';
import Colors from '../../Themes/Colors';
import { FontSize } from '../../Themes/Fonts';

const { width } = Dimensions.get('window');

const YearlyDropDown = ({ listData, onValueChange, initialValue }) => {
  const [value, setValue] = useState(initialValue || null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'gray' ,}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={listData?.map(item => ({ label: item, value: item }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Year' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onValueChange(item.value);
        }}
        renderLeftIcon={() => (
          <Text style={styles.leftIconText}>Show stats: <Text style={{color:Colors.black}}>Yearly</Text></Text>
        )}
        renderRightIcon={() => <Dropdow fill="#000" />}
      />
    </View>
  );
};

export default YearlyDropDown;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width - 40,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor:Colors.white,
    justifyContent: 'center',
    shadowColor:Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    marginBottom:30
  },
  dropdown: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.gray,
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontSize:FontSize.FS16,
    textAlign: 'center',
    color: Colors.black,
  },
  leftIconText: {
    fontSize:FontSize.FS16,
    color: Colors.darkgrey,
    marginRight: 10,
  },
});
