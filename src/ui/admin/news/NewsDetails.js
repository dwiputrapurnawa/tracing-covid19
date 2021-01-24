import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';

const NewsDetails = ({route,navigation}) => {

    const {item} = route.params

    return (
        <ScrollView>
        <View style={styles.container}>

            
            <ImageBackground style={{width: 420, height: 200}} imageStyle={{borderBottomRightRadius: 60, borderBottomLeftRadius: 60,}} source={{uri: item.image}}>
                
            </ImageBackground>

            <View style={{alignSelf: 'center',width: 350, height: 400, borderRightWidth: 2, borderBottomWidth: 2,borderColor: '#D2D2D2', marginTop: 50, borderRadius: 30, alignItems: 'center',
            borderTopWidth: 0.3, borderLeftWidth: 0.3
        }}>
                <Text style={{fontSize: 20, marginLeft: 10 ,marginTop: 20, fontWeight: 'bold', color: '#013765'}}>{item.title}</Text>
                <Text style={{color: '#013765', alignSelf: 'flex-start', margin: 10}}>{item.author}</Text>
                <Text style={{fontSize: 18, textAlign: 'justify', margin: 10, color: '#013765'}}>{item.body}</Text>
                
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
    }
})

export default NewsDetails;

