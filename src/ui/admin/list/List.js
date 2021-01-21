import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Button, ActivityIndicator, FlatList } from 'react-native';
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


    
      if (loading) {
        return <ActivityIndicator />;
      }


    return (
       <View style={styles.container}>

       </View>
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
      }
})

export default List;

