import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Layout, Avatar, Divider,  } from '@ui-kitten/components';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [user,setUser] = useState({});

    const forceUpdate = useState()[1].bind(null, {})

    // var uid = auth().currentUser.uid;

    var uid = '1801020002';

    var fileName;
    var filePath;

    useEffect(() => {
        const subscriber = firestore()
            .collection('student')
            .doc(uid)
            .onSnapshot(documentSnapshot => {

                setUser(documentSnapshot.data())

                console.log(user);
            })
        return () => subscriber();
    })


    const onRefresh = useCallback(() => {
        setRefreshing(true)
        updateState;
        wait(2000).then(() => setRefreshing(false));
    })


    const downloadURLAvatar = async (filename) => {
        const url = await storage().ref('avatar/' + filename).getDownloadURL();
        console.log(url)

        firestore()
            .collection('student')
            .doc(uid)
            .update({
                avatar: url
            })
            .then(() => {
                console.log('Update Profile Successfull')
            })

    }

    const downloadURLBackground = async (filename) => {
        const url = await storage().ref('background_profile/' + filename).getDownloadURL();
        console.log(url)

        firestore()
            .collection('student')
            .doc(uid)
            .update({
                background: url
            })
            .then(() => {
                console.log('Update Background Successfull')
            })

    }

    function chooseImage() {
        const options = {
            mediaType: 'photo',
            quality: 1
        }

        launchImageLibrary(options, (response) => {
            console.log('Response: ', response)

            if(response.didCancel) {
                console.log('User Cancelled image picker')
            } else {
                fileName = response.fileName;
                filePath = response.uri;

                storage()
                    .ref('avatar/' + fileName)
                    .putFile(filePath)
                    .then(() => {
                        console.log('Uploaded');
                        downloadURLAvatar(fileName);
                        forceUpdate;
                    })

            }
        })
    }

    function chooseBackgroundImage() {
        const options = {
            mediaType: 'photo',
            quality: 1
        }

        launchImageLibrary(options, (response) => {
            console.log('Response: ', response)

            if(response.didCancel) {
                console.log('User Cancelled image picker')
            } else {
                fileName = response.fileName;
                filePath = response.uri;

                storage()
                    .ref('background_profile/' + fileName)
                    .putFile(filePath)
                    .then(() => {
                        console.log('Uploaded');
                        downloadURLBackground(fileName);
                        forceUpdate;
                    })
            }
        })
    }

    if(!user) {
        <ActivityIndicator />
    }


    return (
        <Layout style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <TouchableOpacity style={styles.background_profile} onPress={chooseBackgroundImage} >
                    <Image style={styles.logo} source={{
                            uri: user.background ? user.background : 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'
                            }} />
                </TouchableOpacity>
                <TouchableOpacity style={{bottom: 100}} onPress={chooseImage}>
                    <Avatar style={styles.avatar} source={{uri : user.avatar ? user.avatar : 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'}} />
                </TouchableOpacity>
            

            <View style={styles.data}>
                
            <View style={styles.row_container}>
                <View>
                    <Text style={styles.header_text}>Nama Lengkap</Text>
                    <Text>{user.name}</Text>
                </View>

                <View style={{left: 40}}>
                    <Text style={styles.header_text}>NIM</Text>
                    <Text>{user.nim}</Text>
                </View>
            </View> 

            <View style={styles.row_container}>
                <View>
                    <Text style={styles.header_text}>Email</Text>
                    <Text>{user.email}</Text>
                </View>

                <View style={{left: 60}}>
                    <Text style={styles.header_text}>No. Handphone</Text>
                    <Text>{user.telp}</Text>
                </View>
            </View> 

            <View style={styles.row_container}>
                <View>
                    <Text style={styles.header_text}>Angkatan</Text>
                    <Text>{user.angkatan}</Text>
                </View>

                <View style={{left: 160}}>
                    <Text style={styles.header_text}>Prodi</Text>
                    <Text>{user.prodi}</Text>
                </View>
            </View> 
                
    
            </View>

            </ScrollView>
        </Layout>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout);
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        width: 420,
        height: 350,
        backgroundColor: '#DCFCFF'
    },
    avatar: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        top: 20
    },
    background_profile: {
        height: 350,
        borderBottomWidth: 2,
        borderColor: '#D2D2D2'
    },
    data: {
        marginLeft: 50,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        right: 30,
        bottom: 50,
        width: 380,
        borderColor: '#D2D2D2'

    },
    row_container: {
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 20,
    },
    header_text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    }

    
})

export default Profile;