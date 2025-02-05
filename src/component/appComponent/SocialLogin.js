import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GoogleIcon } from '../../assets/svg';

const SocialLogin = ({ Create, createNew,handleGoogleSignIn }) => {

    return (
        <View style={styles.wrapper}>
            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or</Text>
                <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.googleButton} activeOpacity={0.8} onPress={handleGoogleSignIn} >
                <GoogleIcon width={24} height={24} />
                <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            {Create && (
                <>
                    <TouchableOpacity style={styles.createButton} onPress={createNew}>
                        <Text style={styles.createText}>Create New Account</Text>
                    </TouchableOpacity>

                    <Text numberOfLines={2} style={styles.registerText}>
                        By registering, you agree to {'\n'}
                        <Text onPress={() => { }} style={styles.linkText}>Terms & Conditions</Text> and{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>

                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default SocialLogin;

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: "500",
        color: "#555",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        width: "90%",
        justifyContent: "center",
        elevation: 3,  // Android shadow
        shadowColor: "#000",  // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    googleText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginLeft: 10,
    },
    createButton: {
        marginTop: 15,
        paddingVertical: 10,
    },
    createText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#984D7A",
        fontWeight: "600",
    },
    registerText: {
        textAlign: "center",
        fontSize: 14,
        color: "#666",
        marginVertical: 10,
    },
    linkText: {
        textDecorationLine: 'underline',
        color: "#007BFF",
    },
    skipButton: {
        marginTop: 10,
        backgroundColor: "#F5F5F5",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    skipText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});
