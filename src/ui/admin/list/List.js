import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Button, ActivityIndicator, FlatList } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const List = () => {


    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]); 

    //function buat ubah status waiting ke in
    const waitingtoIn = (id) =>{
        var status = firestore().collection("booking").doc(id);
        return status.update({
            status:"In"
        })
        .then(function() {
            console.log("Status successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });

    }

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
        <FlatList 
        data={users}
        keyExtractor={(users,index)=>index}
        renderItem={({ item }) => (
          <View style={{ height: 150, flex: 1, alignItems: 'center', justifyContent: 'center',marginTop: 80 }}>
            <Text>Bertemu: {item.bertemu}</Text>
            <Text>Tanggal: {item.date}</Text>
            <Text>Kepentingan: {item.kepentingan}</Text>
            <Text>Status: {item.status}</Text>
            <Text>ID Mahasiswa: {item.student_id}</Text>
            <Text>Waktu: {item.time}</Text>
            <TouchableOpacity  style={styles.button} onPress={() => waitingtoIn(item.key)}>
                 <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#2d3030",
        borderRadius: 10,
        padding: 10,
      }
})

export default List;

