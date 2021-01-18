import React, { useState, } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';

const Booking = () => {

    const [kepentingan, setKepentingan] = useState();
    const [bertemu, setBertemu] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [kouta, setKouta] = useState(0);

    var user_uid = auth().currentUser.uid;

    console.log(date.toDateString());
    console.log(date.toTimeString());

    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'Android');
        setDate(currentDate);
        
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


    const checkKouta = () => {
        firestore()
            .collection('booking')
            .where('date','==',date.toDateString())
            .onSnapshot(querySnapshot => {
                setKouta(querySnapshot.size)
            })
        
    }


    const uploadBooking = () => {
        firestore()
            .collection('booking')
            .add({
                bertemu: bertemu,
                date: date.toDateString(),
                time: date.toTimeString(),
                kepentingan: kepentingan,
                student_id: user_uid
            })
            .then(() => {
                console.log('Booking Successfull');
            })
    }

    return (
        <View style={styles.container}>
            <Text>Booking</Text>
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

export default Booking;

