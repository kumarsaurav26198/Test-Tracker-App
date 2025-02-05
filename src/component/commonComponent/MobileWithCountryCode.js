import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const MobileWithCountryCode = props => {
  const {placeholder, onChangeText, value, onCountryChange} = props;
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');

  const handleSelectCountry = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    if (onCountryChange) {
      onCountryChange(country.callingCode[0]);
    }
  };

  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(callingCode);
    }
  }, [callingCode, onCountryChange]);

  return (
    <View style={styles.container}>
      <CountryPicker
        withCallingCodeButton={true}
        withFilter={true}
        withAlphaFilter={true}
        withCallingCode={true}
        withFlag={true}
        onSelect={handleSelectCountry}
        countryCode={countryCode}
        containerButtonStyle={styles.countryPicker}
      />
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : `+${callingCode}`}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default MobileWithCountryCode;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingRight: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 0.8,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 18,
    height: 50,
  },
  countryPicker: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
