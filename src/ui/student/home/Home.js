import React, {useState,useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { Avatar, Divider } from '@ui-kitten/components';
import { Badge, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-generator';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {

    const [myBooking, setMyBooking] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [nextBooking, setNextBooking] = useState([])
    const [totalLoading, setTotalLoading] = useState(true);
    const [nextBookingLoading, setNextBookingLoading] = useState(true);
    const [myBookingLoading, setMyBookingLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [qrcode, setQRCode] = useState('In')
    const [visible, setVisible] = useState(false);


    const uid = '1801020002'

    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
            })
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false));
    });

    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .where('student_id', '==', uid)
            .onSnapshot(querySnapshot => {
                setTotalBook(querySnapshot.size)
                setTotalLoading(false)
            })
        
        return () => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
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
            setMyBookingLoading(false)
        })

        return () => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .where('student_id','==',uid)
            .limit(1)
            .onSnapshot(querySnapshot => {
                

                querySnapshot.forEach(documentSnapshot => {
                    setNextBooking(documentSnapshot.data()['date'])
                    setNextBookingLoading(false)
                })
            })
        
        return () => subscriber();
    }, [])
        


    return (
        <SafeAreaView style={{backgroundColor: '#ffffff'}}>

            <FlatList
            data={myBooking}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
        <View style={styles.container}>

                <ImageBackground style={styles.header_background}
                 source={{uri:'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0' }}
                 imageStyle={styles.header_background}
                 >

                <Image style={styles.header_logo}  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84' }} />
                    <View style={styles.avatar_container}>
                    <Text style={styles.avatar_text}>Hai, Ida Bagus Dwi Putra Purnawa</Text>
                    <TouchableOpacity>
                        <Avatar style={styles.avatar} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'}} />
                        <Badge badgeStyle={styles.avatar_badge} status='success' />
                    </TouchableOpacity>
                </View>
                
                </ImageBackground>

                <Button title="Login" onPress={() => navigation.push('Login')} />

           

            <View style={styles.icon_container}>

                <TouchableOpacity style={styles.icon_button} onPress={() => navigation.push('News_Student')}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/megaphone.png?alt=media&token=b0796d28-093f-43e1-a071-8dacfadd726b'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 

                <TouchableOpacity style={styles.icon_button} onPress={() => navigation.push('Profile_Student')}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 

                <TouchableOpacity style={styles.icon_button} onPress={signOut}>
                    <Image source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/settings.png?alt=media&token=564edd31-73e3-4ad5-8a7d-394ce9b424b5'
                    }}
                    style={styles.icon_settings}
                    />
                </TouchableOpacity> 
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <ImageBackground 
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
                style={{width: 100, height: 150, flexDirection: 'column', margin: 20,borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                imageStyle={{borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                >
                <Text style={styles.board_total_text}>Total</Text>
                <Divider style={styles.board_total_divider} />
                <Text style={{alignSelf: 'center', fontSize: 30, fontWeight: 'bold', top: 40, color: '#013765'}}>
                    {
                        totalLoading ? <ActivityIndicator size='large' color='#013765' /> : totalBook
                    }
                </Text>
                </ImageBackground>

                <ImageBackground 
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
                style={{width: 200, height: 150, flexDirection: 'column', margin: 20, borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                imageStyle={{borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                >
                <Text style={styles.board_total_text}>Next Booking</Text>
                <Divider style={styles.board_total_divider} />
                <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold', top: 40, color: '#013765'}}>
                    {
                        nextBookingLoading ? <ActivityIndicator size='large' color='#013765' /> : nextBooking
                    }
                </Text>

                </ImageBackground>
            </View>
                    
            
            <View style={styles.all_booking_container}>
                <Text style={styles.all_booking_text}>All Bookings</Text>
                <Divider style={styles.all_booking_divider} />
            </View>
            
            
        </View>
                </>
            }



            renderItem={({item}) => (
                <TouchableOpacity onPress={toggleOverlay}>
                <ImageBackground
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0' }}
                imageStyle={styles.booking_container}
                style={styles.booking_container}
                >
                
                {
                    myBookingLoading ? <ActivityIndicator size='large' color='#013765' /> : <>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 30, color: '#013765',}}>Booking</Text>
                <Divider style={{borderColor: "#D2D2D2", borderWidth: 1}} />

                <View style={{flexDirection: 'row'}}>

                    <View style={{flexDirection: 'column', left: 50, margin: 10}}>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 30, color: '#013765', right: 50, top: 10}}>{item.date}</Text>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 18, color: '#013765', right: 50, top: 10}}>{item.time}</Text>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 18, color: '#013765', right: 60, top: 10}}>{item.kepentingan}</Text>
                        <Divider style={{borderWidth: 1, borderColor: "#D2D2D2", top: 20, right: 50 }} />
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 15, color: '#013765', right: 60, top: 25, margin: 2}}>{item.bertemu}</Text>
                    </View>

                    <Divider style={{borderWidth: 1, height: 155, borderColor: "#D2D2D2" }} />
                    
                    <View style={{flexDirection: 'column', alignSelf: 'center', left: 20, bottom: 10}}>
                            <QRCode
                            value={item.key}
                            size={80}
                            bgColor='#013765'
                            fgColor='white'
                            
                            />
                            <View style={{alignItems: 'center', borderWidth: 2, top: 20, backgroundColor:
                             (item.status == 'Waiting') ? ('yellow') : ((item.status == 'In') ? ('green') : ('red')) , 
                             borderColor: (item.status == 'Waiting') ? ('yellow') : ((item.status == 'In') ? ('green') : ('red')) }}>
                                <Text style={{fontWeight: 'bold',  color: '#013765'}}>{item.status}</Text>
                            </View>
                            
                    </View>
                   
                </View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <QRCode
                            value={item.key}
                            size={300}
                            bgColor='#013765'
                            fgColor='white'
                            
                            />
                </Overlay>
                </>
                }
                
                </ImageBackground>
                </TouchableOpacity>
            )}
            />
    
        </SafeAreaView>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout)
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',

    },
    header_background: {
        width: 410,
        height: 200,
        borderBottomRightRadius: 100,
    
    },
    header_logo: {
        width: 300,
        height: 300,
        bottom: 100
        
    },
    icon_settings: {
        width: 60,
        height: 60,
        margin: 8
    },
    avatar_container: {
        flexDirection: 'row',
        marginLeft: 20,
        bottom: 200
    },
    avatar_text: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#013765'
    },
    avatar: {
        width: 50,
        height: 50
    },
    avatar_badge: {
        left: 20,
        bottom: 42
    },
    icon_container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    icon_button: {
        margin: 10 ,
        height: 80,
        width: 80,
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
        width:380,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    board_total_text: {
        fontSize: 20, 
        fontWeight: 'bold', 
        alignSelf: 'center',
        top: 20,
        color: '#013765'
    },
    board_total_divider: {
        borderWidth: 1, 
        borderColor: '#D2D2D2', 
        top: 20

    },
    board_total_values: {
        fontSize: 30, 
        fontWeight: 'bold', 
        right: 100, 
        top: 30, 
        alignSelf: 'center',
        color: '#013765'
    },
    board_next_booking: { 
        bottom: 200,
        left: 70
    },
    board_next_booking_text: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#013765'
    },
    board_next_booking_divider: {
        borderWidth: 1, 
        borderColor: '#D2D2D2',
    },
    board_next_booking_values: {
        fontSize: 20, 
        fontWeight: 'bold', 
        top: 30, 
        alignSelf: 'center',
        color: '#013765'
    },
    all_booking_container: {
        marginLeft: 10, 
        width: 380,
    },
    all_booking_text: {
        fontWeight: 'bold', 
        marginBottom: 5,
        color: '#013765'
    },
    all_booking_divider: {
        borderWidth: 1, 
        borderColor: '#D2D2D2',
        marginBottom: 5
    },

})

export default Home;

