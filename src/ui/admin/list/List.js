import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator, FlatList, ImageBackground, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Divider, Button, Input, Icon } from '@ui-kitten/components';

const List = () => {


    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const searchIcon = (props) => (
      <TouchableOpacity onPress={onSearch}>
      <Icon {...props} name="search" />
      </TouchableOpacity>
    )

    const onSearch = useCallback(() => {
      firestore()
        .collection('booking')
        .where('student_id', '==', search.toLowerCase())
        .onSnapshot(querySnapshot => {
          const booking = [];

          querySnapshot.forEach(documentSnapshot => {
            booking.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setUsers(booking)
          setLoading(false)
        })
    })

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setLoading(true);
      firestore()
          .collection('booking')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            setLoading(false);
          });

      wait(2000).then(() => setRefreshing(false))
    })


    useEffect(() => {
        const subscriber = firestore()
          .collection('booking')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            setLoading(false);
          });
    
        
        return () => subscriber();
      }, []);


    
      if (loading) {
        return <ActivityIndicator />;
      }


    return (
      <ImageBackground style={styles.image_background} source={{
        uri:'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
        >
        <FlatList 
        data={users}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
          <Image style={{width: 300, height: 200}}
                 source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} />
          <Text style={styles.txt}>list</Text>
          <Input onChangeText={(value) => setSearch(value)}
           accessoryLeft={searchIcon} placeholder=" Search for Email" style={{width: 350, height: 100, alignSelf: 'center',
           borderColor: "#D2D2D2"}} />
        
          </>
        }
        renderItem={({ item }) => (
          <View  >
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.color_text}>Booking</Title>
                <Divider style={{borderWidth: 1, borderColor: '#013765'}} />
                <Paragraph style={styles.color_text} >Bertemu: {item.bertemu}</Paragraph>
                <Paragraph style={styles.color_text}>Kepentingan: {item.kepentingan}</Paragraph>
                <Paragraph style={styles.color_text}>Tanggal: {item.date}</Paragraph>
                <Paragraph style={styles.color_text}>Email: {item.student_id}</Paragraph>
                <Paragraph style={styles.color_text}>Waktu: {item.time}</Paragraph>
                <Divider style={{borderWidth: 1, borderColor: '#013765'}} />
              </Card.Content>
              <Card.Actions>
               
              <View style={{alignItems: 'center', borderWidth: 1, borderRadius: 10 ,backgroundColor:
                             (item.status == 'Waiting') ? ('#F7DC6F') : ((item.status == 'In') ? ('green') : ('red')) , 
                             borderColor: (item.status == 'Waiting') ? ('#F7DC6F') : ((item.status == 'In') ? ('green') : ('red')),
                             padding: 10, width: 300 }}>
                                <Paragraph style={{fontWeight: 'bold',  color: 'white'}}>{item.status}</Paragraph>
                                {
                                    ((item.status == 'Out') ? true : false)  && 
                                    
                                    <Button onPress={() => {
                                        firestore()
                                            .collection('booking')
                                            .doc(item.key)
                                            .delete()
                                            .then(() => {
                                                console.log('Booking Deleted')
                                            })
                                    }} style={{borderRadius: 10, margin: 3, backgroundColor: '#013765', borderColor: '#013765',width: 100 }}>
                                        Delete
                                    </Button>
                                }
                            </View>
              </Card.Actions>
            </Card>
          </View>
        )}
      />
      </ImageBackground>
      
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
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: "#00E8FF",
        borderRadius: 10,
        padding: 10,
      },

    card: {
      width: "80%",
      borderWidth: 1,
      marginHorizontal: "10%",
      marginVertical: 10,
      borderRadius: 20,
      borderColor: 'navy',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1.0,
      shadowRadius: 2,
      elevation: 10,
    },

    txt: {
      fontSize: 60,
      textAlign: "center",
      textTransform: "uppercase",
      fontWeight: 'bold',
      color: '#013765',
      paddingBottom: 30
    },

    image_background: {
      width: 390,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1
    },
    color_text: {
      color: '#013765',
      fontWeight: 'bold'
    }

    
})

export default List;

