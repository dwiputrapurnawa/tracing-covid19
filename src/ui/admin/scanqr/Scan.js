import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Scan = () => {
    return (
        <View style={styles.container}>
            <Text>Scan QR Page</Text>
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

export default Scan;

