import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert, ImageBackground, Image } from 'react-native';
import storage, { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button, Icon, } from '@ui-kitten/components';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Ionicons from 'react-native-vector-icons/Ionicons';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};


const RightArrow = (props) => (
  <Icon {...props} name='arrow-right'/>
);
const News = () => {

  const multilineInputState = useInputState();
  const mediumInputState = useInputState();

    const db = firestore();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [incorrect, setIncorrect] = useState(false);

    const user = auth().currentUser;
     
    const forceUpdate = useState()[1].bind(null, {})
    var fileName;
    var filePath;

    const postNewsPressed = () => {

      if((title == null || body == null || image == null) || (title == '' || body == '' || image == '')) {
        setIncorrect(true)
      } else {
        
            firestore().collection('berita')
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
        setImageLoading(true)

        launchImageLibrary(options, (response) => {
            console.log('Response: ', response)

            if(response.didCancel) {
                console.log('User Cancelled image picker')
            } else {

              setImageLoading(true)
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

            setImageLoading(false)
        })

        
    }

    return (
      
    <ScrollView  >

    <View style={styles.container}>
      <ImageBackground style={styles.image_background} source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
      >
        <Image style={{width: 300, height: 200, marginRight: 150}}
                 source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} />
      <Text style={{ fontWeight: "bold", fontSize: 55, paddingBottom: 20, color: '#013765' }}>News</Text>

      {
                    incorrect ? (
                        <View style={{flexDirection: 'row', height: 50, width: 200, borderRadius: 10, margin: 20, alignItems: 'center', backgroundColor: '#FEDCE0'}}>
                            <Text style={{paddingLeft: 20}}>Data is Empty</Text>
                            <TouchableOpacity style={{paddingLeft: 30}} onPress={() => setIncorrect(false)}>
                                <Ionicons name="close" size={20} />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

        <TouchableOpacity onPress={chooseImage} >
          

          {
            image ? <ImageBackground style={{height: 200, width: 350,}} source={{uri: image}}  /> : (<View style={{width: 350, height: 200, borderWidth: 2, marginBottom: 10, borderStyle: 'dashed', borderRadius: 10, borderColor: '#013765'}}>
            <Image style={{width: 50, height: 50, alignSelf: 'center', marginTop: 50, }}  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/cloud-computing.png?alt=media&token=3fcf5455-d5a9-4efc-8826-4a593066695d'}} />
            <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center', marginTop: 20,color: '#013765'}}>Upload Image</Text>
            </View>)
          }
          
          
        </TouchableOpacity>
        
        {
          imageLoading && (<ProgressBar style={{width: 300}} styleAttr="Horizontal" />)
        }
        

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
        textStyle={{ minHeight: 150, textAlignVertical: 'top', maxHeight: 150 }}
        placeholder='Konten Berita'
        style={{width: '80%', borderColor: '#35a7f2', marginTop: 10 }}
        {...multilineInputState}
        value={body}
        onChangeText={(text) => setBody(text)}
      />


      <Button  status='primary' style={{width: '80%', marginTop: 10, borderRadius: 30, marginBottom: 20 }} appearance='outline'  accessoryRight={RightArrow} onPress={postNewsPressed }>
        Upload Berita
      </Button>
      </ImageBackground>
    </View>
  </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    image_background: {
      width: 420,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default News;

