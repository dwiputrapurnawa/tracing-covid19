import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Input, CheckBox, Icon, Layout } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [checked, setChecked] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      const toggleSecurityEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, []);

    if (initializing) return null;

    const passwordIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecurityEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    )

    const AlertIcon = (props) => (
        <Icon {...props} name='alert-circle-outline'/>
      );

    const usernameIcon = (props) => (
        <Icon {...props} name='person'/>
      );

    const passwordLockIcon = (props) => (
        <Icon {...props} name='lock'/>
      );


    const Signin = () => {
        firestore()
            .collection('admin')
            .where('username','==',username)
            .where('password','==',password)
            .get()
            .then((querySnapshot) => {
                console.log('User is Valid!');

                querySnapshot.forEach(documentSnapshot => {
                    auth()
                    .signInWithEmailAndPassword(documentSnapshot.data()['email'],password)
                    .then(() => {
                        console.log('User account signed in!');
                    })
                    .catch(error => {
                    
                        if (error.code === 'auth/invalid-email') {
                          console.log('That email address is invalid!');
                        }
                    
                        console.error(error);
                      });
                })
            }) 
    }

    if(!user) {
        return (
            <View style={styles.container}>
                <ImageBackground 
                    style={{width: 420, alignItems: 'center'}}
                    imageStyle={{width: 420, height: 800}}
                    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}} >
                    
                    <Image style={{width: 300, height: 200}}
                     source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} /> 
        
                    <Text style={{fontSize: 40, fontWeight: 'bold', color: '#013765'}}>Sign In</Text>
                    <Input label={
                        <Text style={{fontWeight: 'bold', color: '#013765'}}>Username</Text>
                    } style={{width: 350, borderColor: "#D2D2D2"}} placeholder="Username" onChangeText={(value) => setUsername(value)} accessoryLeft={usernameIcon} />
                    <Input label={
                        <Text style={{fontWeight: 'bold', color: '#013765'}}>Password</Text>
                    } style={{width: 350, borderColor: "#D2D2D2"}} placeholder="Password" onChangeText={(value) => setPassword(value)}
                    accessoryRight={passwordIcon} secureTextEntry={secureTextEntry} caption={<Text style={{color: '#013765' }}>Should contain at least 8 symbols</Text>}
                    captionIcon={AlertIcon} accessoryLeft={passwordLockIcon} />
        
                    <TouchableOpacity>
                    <Text style={{marginLeft: 200,fontWeight: 'bold', color: '#013765', marginTop: 10}}>Forgot your password?</Text>
                    </TouchableOpacity>
        
                    <CheckBox
                    style={{marginRight: 220}}
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}>
        
                    <Text style={{fontWeight: 'bold', color: '#013765'}}>Remember me</Text>
                    </CheckBox>
        
                    <TouchableOpacity style={{borderWidth: 2, width: 350, height: 60, marginTop: 40, borderRadius: 30,
                         backgroundColor: '#ffffff', alignItems: 'center', borderColor: "#D2D2D2" }} onPress={Signin}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#013765', marginTop: 5 }}>Login</Text>
                    </TouchableOpacity>
        
                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        <Text style={{fontWeight: 'bold', color: '#013765', marginRight: 10}}>Are you an Student?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Text style={{fontWeight: 'bold', color: '#1dc9d3'}}>Login Here</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
            </View>
        );

        
    }

    return (
        <Layout onLayout={() => navigation.push('Tab_Admin')} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap'
    }
})

export default Login;

