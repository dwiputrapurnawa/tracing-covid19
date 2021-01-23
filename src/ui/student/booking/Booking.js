import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { Input, } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Booking = ({ navigation }) => {

    const [kepentingan, setKepentingan] = useState();
    const [bertemu, setBertemu] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [kouta, setKouta] = useState(0);
    const [incorrect, setIncorrect] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const user = auth().currentUser

    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'Android');
        setDate(currentDate);
        
    }

    const createSuccessfullBooking = () => {
        Alert.alert(
            "Booking",
            "Your booking Successfully",
            [
                {
                    text: 'Ok', onPress: () => console.log('Oke')
                }
            ],
            {cancelable: false}
        )
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatepicker = () => {
        showMode('date');
    }

    const showTimepicker = () => {
        showMode('time');
    }

    useEffect(() => {
        const subscriber = firestore()
        .collection('booking')
        .where('date','==',date.toDateString())
        .onSnapshot(querySnapshot => {
            setKouta(querySnapshot.size)
        })
        return () => subscriber();
    })



    const uploadBooking = () => {

        if(kepentingan == null && bertemu == null) {
            setIncorrect(true)
            setErrorMsg('Your Data is Empty')
        } else {
            if(date <= new Date()) {
                setIncorrect(true)
                setErrorMsg('Incorrect Date')
            } else {

                firestore()
                .collection('booking')
                .where('date', '==', date.toDateString())
                .get()
                .then(documentSnapshot => {
                    if(documentSnapshot != null) {
                        setIncorrect(true)
                        setErrorMsg('You already Booking')
                    } else {
                        firestore()
                        .collection('booking')
                        .add({
                            bertemu: bertemu,
                            date: date.toDateString(),
                            time: date.toTimeString(),
                            kepentingan: kepentingan,
                            status: "Waiting",
                            student_id: user.email
                        })
                        .then(() => {
                            console.log('Booking Successfull');
                            createSuccessfullBooking();
                        })
                    }
                })
                
                
                
            }
        }

        
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                style={{width: 420, alignItems: 'center'}}
                imageStyle={{width: 420, height: 800}}
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}} >
                
                <Image style={{width: 300, height: 200}}
                 source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} /> 
    
                <Text style={{fontSize: 40, fontWeight: 'bold', color: '#013765'}}>Booking</Text>

                {
                    incorrect ? (
                        <View style={{flexDirection: 'row', height: 50, width: 200, borderRadius: 10, margin: 20, alignItems: 'center', backgroundColor: '#FEDCE0'}}>
                            <Text style={{paddingLeft: 20}}>{errorMsg}</Text>
                            <TouchableOpacity style={{paddingLeft: 30}} onPress={() => setIncorrect(false)}>
                                <Ionicons name="close" size={20} />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                <Input label={
                    <Text style={{fontWeight: 'bold', color: '#013765'}}>Kepentingan</Text>
                } style={{width: 350, borderColor: "#D2D2D2"}} placeholder="Kepentingan datang ke kampus" onChangeText={(value) => setKepentingan(value)}  />
                <Input label={
                    <Text style={{fontWeight: 'bold', color: '#013765'}}>Bertemu</Text>
                } style={{width: 350, borderColor: "#D2D2D2"}} placeholder="Bertemu dengan siapa" onChangeText={(value) => setBertemu(value)}
                  />
                
                <View style={{flexDirection: 'row',}}>
                <TouchableOpacity onPress={showDatepicker} style={{height: 40, width: 130, borderWidth: 1,
                     borderColor: "#D2D2D2", alignItems: 'center', margin: 10, borderRadius: 20, backgroundColor: '#ffffff' }}>
                    <Text style={{fontWeight: 'bold', color: '#013765', margin: 10,}}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={showTimepicker} style={{height: 40, width: 130, borderWidth: 1,
                     borderColor: "#D2D2D2", alignItems: 'center', margin: 10, borderRadius: 20, backgroundColor: '#ffffff' }}>
                    <Text style={{fontWeight: 'bold', color: '#013765', margin: 10}}>{date.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                
                </View>
               
                <View style={{height: 40, width: 130, borderWidth: 1,
                     borderColor: "#D2D2D2", alignItems: 'center', margin: 10, borderRadius: 3, backgroundColor: '#ffffff' }} >
                    <Text style={{fontWeight: 'bold', color: '#013765', margin: 10}}>Kouta : {20-kouta}</Text>
                </View>
    
                <TouchableOpacity onPress={uploadBooking} style={{borderWidth: 2, width: 350, height: 60, marginTop: 10, borderRadius: 30,
                     backgroundColor: '#ffffff', alignItems: 'center', borderColor: "#D2D2D2" }}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#013765', marginTop: 5 }}>Submit</Text>
                </TouchableOpacity>

                

                {
                    show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                        />
                    )
                }
                    
                </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})

export default Booking;

