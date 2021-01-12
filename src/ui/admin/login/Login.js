import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <Text>Login Admin</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;

