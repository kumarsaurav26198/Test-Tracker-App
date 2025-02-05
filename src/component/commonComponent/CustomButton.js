import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../Themes/Colors';

const CustomButton = (props) => {
    const { onPress, title, backgroundColor, color, marginTop, borderRadius, disabled, fontWeight, marginBottom, loading } = props;

    return (
        <TouchableOpacity
            disabled={disabled || loading}
            activeOpacity={disabled || loading ? 1 : 0.7}
            onPress={onPress}
            style={{
                backgroundColor: backgroundColor ? backgroundColor : Colors.black, 
                width: "90%",
                height: 50,
                borderRadius: borderRadius ? borderRadius : 10,
                marginTop: marginTop ? marginTop : 10,
                marginBottom: marginBottom ? marginBottom : 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf:"center"
            }}
        >
            {loading ? (
                <ActivityIndicator size="small" color={color ? color : Colors.btntext} />
            ) : (
                <Text style={{
                    color: color ? color : Colors.white, // Use your color constant directly
                    fontSize: 15,
                    textAlign: "center",
                    fontWeight: fontWeight ? fontWeight : "500"
                }}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({});
