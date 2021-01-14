import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = () => {

    const [nim, setNim] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();

    const sendTokenRequest = () => {
        return fetch('http://localhost:3000/api-student', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: nim
            })
        })
    }

    const getTokenFromApi = () => {
        return fetch(`http://localhost:3000/token/${nim}.json`)
        .then((response) => response.json())
        .then((json) => {
            setToken(json.token)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function Signin() {
        firestore()
            .collection('student')
            .where('nim', '==', nim)
            .where('password', '==', password)
            .get()
            .then(querySnapshot => {
                sendTokenRequest();
                getTokenFromApi();

                auth()
                    .signInWithCustomToken(token)
                    .then(() => {
                        console.log('Sign Successfull')
                    })
                    .catch((error) => {
                        var errorCode = error.code
                        var errorMessage = error.message

                        console.log(errorCode,errorMessage);
                    })
            })
        
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
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

