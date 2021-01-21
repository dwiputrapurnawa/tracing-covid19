import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';
import { Input, Icon } from '@ui-kitten/components';

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

        <FlatList 
        data={users}
        keyExtractor={(users,index)=>index}
        renderItem={({ item }) => (
          <View style={styles.card}>
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
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#2d3030",
        borderRadius: 10,
        padding: 10,
      },

    txt: {
      fontSize: 20,
      
    },

    
})

export default List;

