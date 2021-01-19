import React, {useState,useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { Avatar, Divider, Input, Icon } from '@ui-kitten/components';
import { Badge, } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {

    const [allPost, setAllPost] = useState([]);
    const [totalPost, setTotalPost] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0)
    const [totalLoading, setTotalLoading] = useState(true);
    const [totalBookingLoading, setTotalBookingLoading] = useState(true);
    const [myTotalPostLoading, setMyTotalPostLoading] = useState(true)
    const [myTotalPost, setMyTotalPost] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [searchVal, setSearchVal] = useState('');
    const [userData, setUserData] = useState({})

    const user = !auth().currentUser ? '' : auth().currentUser

    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                navigation.navigate('Startup');
            })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false));
    });

    useEffect(() => {
        const subscriber = firestore()
            .collection('admin')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {

                setUserData(documentSnapshot.data())

            })
        return () => subscriber();
    })

    useEffect(() => {
        const subscriber = firestore()
            .collection('berita')
            .onSnapshot(querySnapshot => {
                setTotalPost(querySnapshot.size)
                setTotalLoading(false)
            })
        
        return () => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
            .collection('berita')
            .where('author','==',user.uid)
            .onSnapshot(querySnapshot => {
                setMyTotalPost(querySnapshot.size)
                setMyTotalPostLoading(false)
            })
        
        return () => subscriber();
    }, [])


    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .onSnapshot(querySnapshot => {
                setTotalBooking(querySnapshot.size)
                setTotalBookingLoading(false)
            })
        
        return () => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
            .collection('berita')
            .onSnapshot(querySnapshot => {
                const post = [];

                querySnapshot.forEach(documentSnapshot => {
                    post.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAllPost(post)
            })
        
            return () => subscriber();
    }, [])

    const searchIcon = (props) => (
        <TouchableOpacity>
        <Icon {...props} name="search-outline" type="ionicon" color='#3588E7' />
        </TouchableOpacity>
    );

    
    const selectAllPost = useCallback(() => {
        const subscriber = firestore()
            .collection('berita')
            .onSnapshot(querySnapshot => {
                const post = [];

                querySnapshot.forEach(documentSnapshot => {
                    post.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAllPost(post)
            })
        
        return () => subscriber();
    }, [])

    const selectMyPost = useCallback(() => {
        const subscriber = firestore()
            .collection('berita')
            .where('author','==',user.uid)
            .onSnapshot(querySnapshot => {
                const post = [];

                querySnapshot.forEach(documentSnapshot => {
                    post.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAllPost(post)
            })
        
        return () => subscriber();
    }, [])
        


    return (
        <SafeAreaView style={{backgroundColor: '#ffffff'}}>

            <FlatList
            data={allPost}
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
                    <Text style={styles.avatar_text}>Hai, {userData.name}</Text>
                    <TouchableOpacity onPress={() => navigation.push('Profile_Admin')}>
                        <Avatar style={styles.avatar} source={{uri: userData.avatar ? userData.avatar : 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/profile.png?alt=media&token=cf16a8b0-6247-482b-93a8-cf82185a095b'}} />
                        <Badge badgeStyle={styles.avatar_badge} status='success' />
                    </TouchableOpacity>
                </View>

                <Input placeholder="Search" style={{width: 350, height: 200, bottom: 150, margin: 10, borderRadius: 20, borderColor: "#D2D2D2" }}
                accessoryLeft={searchIcon} onChangeText={value => setSearchVal(value)}  />
                
                </ImageBackground>

                <View style={styles.icon_container}>

                <TouchableOpacity style={styles.icon_button} onPress={() => navigation.push('Profile_Admin')}>
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

           
                
            
            
            <View style={{marginBottom: 10}}>

                <ImageBackground 
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
                style={{width: 350, height: 150, flexDirection: 'column', margin: 10, borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                imageStyle={{borderRadius: 10, borderColor: "#D2D2D2", borderWidth: 1}}
                >
                <Text style={styles.board_total_text}>Dashboard</Text>
                <Divider style={styles.board_total_divider} />
            
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', alignItems: 'center', margin: 20, marginTop: 30}}>
                    <Text style={{fontWeight: 'bold', fontSize: 26, color: '#013765' }}>Total Booking</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 28, color: '#013765',}}>{
                        totalBookingLoading ? <ActivityIndicator size='large' color='#013765' /> : totalBooking
                    }</Text>
                </View>
                <Divider style={{borderWidth: 1, borderColor: "#D2D2D2", height: 80, top: 20}} />
                <View style={{flexDirection: 'column', alignItems: 'center', margin: 10, alignSelf: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: '#013765' }}>Total Post : {
                        totalLoading ? <ActivityIndicator size='small' color='#013765' /> : totalPost
                    } </Text>

                    <Divider style={{borderWidth: 1, borderColor: "#D2D2D2",width: 100,}} />
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: '#013765' }}>My Post : {
                        myTotalPostLoading ? <ActivityIndicator size='small' color='#013765' /> : myTotalPost
                    } </Text>
                    

                    
                </View>
            </View>

                </ImageBackground>
            </View>

            
        <View style={{flexDirection: 'row', marginBottom: 30, marginTop: 20}}>
           <TouchableOpacity onPress={selectAllPost}>
            
            <View style={styles.all_booking_container}>
                <Text style={styles.all_booking_text}>All News</Text>
                <Divider style={styles.all_booking_divider} />
            </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={selectMyPost}>
            
            <View style={styles.all_booking_container}>
                <Text style={styles.all_booking_text}>My Post</Text>
                <Divider style={styles.all_booking_divider} />
            </View>

            </TouchableOpacity>
        </View>    
            
        </View>
                </>
            }



            renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.push('NewsDetails_Admin', {item: item})}>
                <ImageBackground
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
                style={styles.booking_container} imageStyle={styles.booking_container} >
                
                <Image style={{width: 360, height: 200, margin: 10}} source={{uri: item.image}} />

                <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 22, margin: 10}}>{item.title}</Text>

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
        height: 300,
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
        bottom: 180,
        left: 140
    },
    avatar_text: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#013765',
    },
    avatar: {
        width: 50,
        height: 50,
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
        height: 340,
        width:380,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    board_total_text: {
        fontSize: 30, 
        fontWeight: 'bold', 
        alignSelf: 'center',
        top: 10,
        color: '#013765',
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
        width: 180,
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

