import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const sendTokenRequest = () => {
        return fetch('http://localhost:3000/api-admin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        })
    }

    const Signin = () => {
        firestore()
            .collection('admin')
            .where('username','==',username)
            .where('password','==',password)
            .get()
            .then((querySnapshot) => {
                console.log('User is Valid!');

                sendTokenRequest();

                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.data()['token']);

                    auth()
                        .signInWithCustomToken(documentSnapshot.data()['token'])
                        .then(() => {
                            console.log('User Signed in!');
                        })
                        .catch((error) => {
                            console.log(error.code,error.message);
                        })
                })
            }) 
    }

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

