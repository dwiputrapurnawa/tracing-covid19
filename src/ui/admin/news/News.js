import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator, Image } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';




const News = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])

    const db = firestore();

    useEffect(() => {
        const subscriber = db
        .collection('berita')
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

           <FlatList style={styles.container}
        data={users}
        renderItem={({ item }) => (
          <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {item.title}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Body: {item.body}</Text>
            <Image source={{uri:item.image}}/>
          </View>
        )}/>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default News;

