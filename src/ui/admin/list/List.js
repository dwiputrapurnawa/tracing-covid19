import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';

const List = () => {


    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]); 



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

      
    const searchIcon = (props) => (
      <Icon {...props} name="search" />
    )
    
      if (loading) {
        return <ActivityIndicator />;
      }


    return (
      <ScrollView>
        <ImageBackground style={styles.image_background} source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
          >
        <Text style={styles.txt}>list</Text>
        <FlatList 
        data={users}
        keyExtractor={(users,index)=>index}
        renderItem={({ item }) => (
          <View  >
            <Card style={styles.card}>
              <Card.Content>
                <Title>Izin Ke Kampus</Title>
                <Paragraph>Bertemu: {item.bertemu}</Paragraph>
                <Paragraph>Kepentingan: {item.kepentingan}</Paragraph>
                <Paragraph>Tanggal: {item.date}</Paragraph>
                <Paragraph>ID Mahasiswa: {item.student_id}</Paragraph>
                <Paragraph>Waktu: {item.time}</Paragraph>
              </Card.Content>
              <Card.Actions>
              <Paragraph>Status: {item.status}</Paragraph>
              <TouchableOpacity  style={styles.button} onPress={() => waitingtoIn(item.key)}>
                 <Text style={{ color: "#000",fontWeight: 'bold',  textTransform: 'uppercase' }}>Confirm</Text>
              </TouchableOpacity>
              </Card.Actions>
            </Card>
          </View>
        )}
      />
          </ImageBackground>
        
      </ScrollView>

    );
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
      fontWeight: 'bold'
    },

    image_background: {
      width: 390,
      height: 800,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1
    }

    
})

export default List;

