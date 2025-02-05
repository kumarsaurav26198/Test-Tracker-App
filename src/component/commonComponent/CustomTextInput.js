import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../../Themes/Colors';
import { FontSize, FontsWeights } from '../../Themes/Fonts';
import { CloseEye, OpenEye } from '../../assets/svg';

const C_TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  onBlur,
  onFocus,
  showPasswordToggle = false,
  containerStyle = {},
  inputStyle = {},
  borderColor = Colors.primary,
  placeholderStyle = {},
  onPress, 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    if (!editable && onPress) {
      onPress(); // Call onPress function if editable is false
    }
  };

  return (
    <View style={[styles.inputContainer, containerStyle, { borderColor }]}>
      <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderStyle.color || Colors.gray}
          style={[styles.input, inputStyle, {
            fontSize: placeholderStyle.fontSize || FontSize.FS15,
            fontWeight: placeholderStyle.fontWeight || FontsWeights.FW500,
          }]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </TouchableOpacity>
      {showPasswordToggle && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          {isPasswordVisible ? <OpenEye /> : <CloseEye />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingLeft: 10,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS15,
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default C_TextInput;
