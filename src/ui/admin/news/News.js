import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const News = () => {
    return (
        <View style={styles.container}>
            <Text>News Page</Text>
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

export default News;

