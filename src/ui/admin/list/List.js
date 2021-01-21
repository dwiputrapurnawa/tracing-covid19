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

      
    const searchIcon = (props) => (
      <Icon {...props} name="search" />
    )
    
      if (loading) {
        return <ActivityIndicator />;
      }


    return (
       <View style={styles.container}>



         <Input style={{width: 350,}} placeholder="Search" accessoryLeft={searchIcon} />


         <DataTable style={{flexWrap: 'wrap'}}>
           <DataTable.Header>
             <DataTable.Title>Email</DataTable.Title>
             <DataTable.Title>Date</DataTable.Title>
             <DataTable.Title>Time</DataTable.Title>
             <DataTable.Title>Kepentingan</DataTable.Title>
             <DataTable.Title>Bertemu</DataTable.Title>
             <DataTable.Title>Status</DataTable.Title>
           </DataTable.Header>

           {
             users.map((item,key) => (
               <DataTable.Row key={key}>
                 <DataTable.Cell>{item.student_id}</DataTable.Cell>
                 <DataTable.Cell>{item.date}</DataTable.Cell>
                 <DataTable.Cell>{item.time}</DataTable.Cell>
                 <DataTable.Cell>{item.kepentingan}</DataTable.Cell>
                 <DataTable.Cell>{item.status}</DataTable.Cell>
               </DataTable.Row>
             ))
           }

           <DataTable.Pagination
           page={1}
           numberOfPages={3}
           onPageChange={page => console.log(page)}
           label="1-2 of 6"
           
           />
         </DataTable>
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

