import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

const NewsDetails = ({route,navigation}) => {

    const {item} = route.params

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
            style={{width: 420}}
            >

            
            <ImageBackground style={{width: 420, height: 200}} imageStyle={{borderBottomRightRadius: 60, borderBottomLeftRadius: 60,}} source={{uri: item.gambar}}>
                
            </ImageBackground>

            <View style={{alignSelf: 'center',width: 350, height: 400, borderRightWidth: 2, borderBottomWidth: 2,borderColor: '#D2D2D2', marginTop: 50, borderRadius: 30, alignItems: 'center',
            borderTopWidth: 0.3, borderLeftWidth: 0.3
        }}>
                <Text style={{fontSize: 20, marginLeft: 10 ,marginTop: 20, fontWeight: 'bold', color: '#013765'}}>{item.title}</Text>
                <Text style={{fontSize: 18, textAlign: 'justify', margin: 10, color: '#013765'}}>{item.body}</Text>
                <Text style={{right: 100, color: '#013765'}}>{item.author}</Text>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap'
    }
})

export default NewsDetails;

