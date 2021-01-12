import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const List = () => {
    return (
        <View style={styles.container}>
            <Text>List Page</Text>
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

export default List;

