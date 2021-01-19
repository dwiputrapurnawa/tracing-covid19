import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { CheckBox, Input } from '@ui-kitten/components';
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
        firestore()
            .collection('booking')
            .add({
                bertemu: bertemu,
                date: date.toDateString(),
                time: date.toTimeString(),
                kepentingan: kepentingan,
                status: "Waiting",
                student_id: user_uid
            })
            .then(() => {
                console.log('Booking Successfull');
                setKepentingan('');
                setBertemu('');
            })
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

