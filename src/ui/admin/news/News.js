import React, {useEffect, useState} from 'react';
import { StyleSheet, Text,TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button, Icon, } from '@ui-kitten/components';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const ImageIcon = (props) => (
  <Icon {...props} name='image'/>
);

const RightArrow = (props) => (
  <Icon {...props} name='arrow-right'/>
);
const News = () => {

  const multilineInputState = useInputState();
  const mediumInputState = useInputState();

    const db = firestore();

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);

    const user = auth().currentUser;
     
    const forceUpdate = useState()[1].bind(null, {})
      var fileName;
      var filePath;
      const postNewsPressed = () => {
        
            firebase.firestore().collection('berita')
              .add({
                author: user.email,
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
      <Text style={{ fontWeight: "bold", fontSize: 55, paddingBottom: 20 }}>News</Text>

      <Input
        style={styles.input}
        size='medium'
        status='primary'
        style={{width: '80%', borderColor: '#35a7f2' }}
        placeholder='Author Berita'
        {...mediumInputState}
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />

      <Input
        style={styles.input}
        size='medium'
        status='primary'
        style={{width: '80%', borderColor: '#35a7f2', marginTop: 10 }}
        placeholder='Judul Berita'
        {...mediumInputState}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />


      <Input
        multiline={true}
        status='primary'
        textStyle={{ minHeight: 150 }}
        placeholder='Konten Berita'
        style={{width: '80%', borderColor: '#35a7f2', marginTop: 10 }}
        {...multilineInputState}
        value={body}
        onChangeText={(text) => setBody(text)}
      />


      <Button  status='basic' appearance='outline'  accessoryLeft={ImageIcon} onPress={chooseImage} style={{width: '80%', marginTop: 10 }} >
        Choose Image
      </Button>
      

      <Button  status='primary' style={{width: '80%', marginTop: 10 }} appearance='outline'  accessoryRight={RightArrow} onPress={postNewsPressed }>
        Upload Berita
      </Button>
    </View>
  </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '30%'
    },
    
});

export default News;

