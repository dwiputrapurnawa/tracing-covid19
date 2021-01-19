import React, {useEffect, useState} from 'react';
import { StyleSheet, Text,TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';




const News = () => {


    const db = firestore();

      const [author, setAuthor] = useState('');
      const [title, setTitle] = useState('');
      const [body, setBody] = useState('');
      const [image, setImage] = useState(null);
     
    const forceUpdate = useState()[1].bind(null, {})
      var fileName;
      var filePath;
      const postNewsPressed = () => {
        
            firebase.firestore().collection('berita')
              .add({
                author: author,
                title: title,
                body: body,
                image: image,
              }).catch(err => {
                console.log(err);
              })
          .then(()=>{
              Alert.alert("Post Successful")
              
          }).catch((err) => {
            alert(err);
          })
      }
      

      const ImageUrl = async (filename) => {
        const url = await storage().ref('berita/' + filename).getDownloadURL();
        setImage(url);

    }


      function chooseImage() {
        const options = {
            mediaType: 'photo',
            quality: 1
        }

        launchImageLibrary(options, (response) => {
            console.log('Response: ', response)

            if(response.didCancel) {
                console.log('User Cancelled image picker')
            } else {
                fileName = response.fileName;
                filePath = response.uri;

                storage()
                    .ref('berita/' + fileName)
                    .putFile(filePath)
                    .then(() => {
                        console.log('Uploaded');
                        ImageUrl(fileName);
                        forceUpdate;
                    })
            }
        })
    }

    return (
      
    <ScrollView  >

    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 30, paddingBottom: 20 }}>News</Text>

      <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Author</Text>
      <TextInput style={styles.textUser}
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />

      <Text style={{ marginTop: 17, marginBottom: 5, fontWeight: "bold" }}>Title</Text>
      <TextInput style={styles.textUser}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={{ marginBottom: 5, marginTop: 17, fontWeight: "bold" }}>Body</Text>
      <TextInput style={styles.textUser}
        value={body}
        onChangeText={(text) => setBody(text)}
      />

      <TouchableOpacity style={styles.button} onPress={chooseImage}>
        <Text style={{ color: "white" }}>Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={postNewsPressed}>
        <Text style={{ color: "white" }}>Post</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },button: {
      marginTop: 10
    }, textUser: {
      marginTop: 5,
      borderColor: "#777",
      borderWidth: 1,
      borderRadius: 10,
      width: 286,
      padding: 8
    }, textPass: {
      marginTop: 5,
      borderColor: "#777",
      borderWidth: 1,
      width: 286,
      borderRadius: 10,
      padding: 8
    }, button: {
      marginTop: 20,
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: "#2d3030",
      borderRadius: 10,
      padding: 10,
    }
});

export default News;

