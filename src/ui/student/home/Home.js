import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, } from 'react-native';
import { Avatar, Divider } from '@ui-kitten/components';
import { Badge } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {

    const [myBooking, setMyBooking] = useState([]);

    console.log(myBooking)

    const uid = '1801020002'

    const getDate = () => {
        firestore()
            .collection('booking')
            .where('student_id','==',uid)
            .onSnapshot(querySnapshot => {

                const booking = [];

                querySnapshot.forEach(documentSnapshot => {
                    booking.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setMyBooking(booking)
            })
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}} 
                style={styles.header_background}
            />
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} 
             style={styles.header_logo}
            />


            <View style={styles.avatar_container}>
                <Text style={styles.avatar_text}>Hai, Ida Bagus Dwi Putra Purnawa</Text>
                <TouchableOpacity>
                    <Avatar style={styles.avatar} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'}} />
                    <Badge badgeStyle={styles.avatar_badge} status='success' />
                </TouchableOpacity>
            </View>

            <View style={styles.icon_container}>
                <TouchableOpacity style={styles.icon_button}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/18821380.jpg?alt=media&token=560694be-b88f-425a-9b9e-d40ed3d27c38'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 

                <TouchableOpacity style={styles.icon_button}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/megaphone.png?alt=media&token=b0796d28-093f-43e1-a071-8dacfadd726b'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 

                <TouchableOpacity style={styles.icon_button}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 

                <TouchableOpacity style={styles.icon_button}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/settings.png?alt=media&token=564edd31-73e3-4ad5-8a7d-394ce9b424b5'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 
            </View>

            <View style={{alignItems: 'center', flexDirection: 'row', left: 20}}>

                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}} 
                style={{
                    borderWidth: 2, width: 100, height: 150 , bottom: 320, marginLeft: 20, borderColor: '#D2D2D2', borderRadius: 10
                }}
                />

                
                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}} 
               style={{
                borderWidth: 2, width: 200, height: 150 , bottom: 320, marginLeft: 20, borderColor: '#D2D2D2', borderRadius: 10
                }}
                />

            </View>
            
            <View  style={{bottom: 470, marginLeft: 45, marginTop: 20}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20,}}>Total</Text>
                <Divider style={{borderWidth: 1, borderColor: '#D2D2D2'}} />
                <Text style={{marginLeft: 8, top: 20, fontWeight: 'bold', fontSize: 30}}>02</Text>
            </View>
            
           

            
            <View style={{bottom: 330, marginLeft: 10, width: 380}}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>All Bookings</Text>
                <Divider style={{borderWidth: 1, borderColor: '#D2D2D2'}} />
            </View>
            
            

            <View style={styles.booking_container}>
               <Button title="Get Date" onPress={getDate} />

               {
                   myBooking.map((item,key) => (
                       <Text key={key}>Date: {item.date}</Text>
                   ))
               }
                
            </View>
            
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    header_background: {
        width: 410,
        height: 300,
        borderBottomRightRadius: 100 
    },
    header_logo: {
        width: 300,
        height: 300,
        bottom: 380
    },
    icon_settings: {
        width: 60,
        height: 60,
        margin: 8
    },
    avatar_container: {
        flexDirection: 'row',
        bottom: 400,
        marginLeft: 20
    },
    avatar_text: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    avatar: {
        width: 50,
        height: 50
    },
    avatar_badge: {
        bottom: 45,
        left: 20
    },
    icon_container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    icon_button: {
        margin: 10 ,
        height: 80,
        width: 80,
        bottom: 340,
        alignItems: 'center',
        borderRadius: 20,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: '#D2D2D2',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2
    },
    booking_container: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: '#D2D2D2',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        height: 200,
        bottom: 320,
        width:380,
        alignSelf: 'center',
        borderRadius: 10,
    }

})

export default Home;

