import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const QRCode = () => {
    return (
        <View style={styles.container}>
            <Text>QRCode</Text>
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

export default QRCode;

