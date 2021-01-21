import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const News = ({ navigation }) => {

    const [allPost, setAllPost] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false));
    });

    

    useEffect(() => {
        const subscriber = firestore()
            .collection('berita')
            .onSnapshot(querySnapshot => {
                const post = [];

                querySnapshot.forEach(documentSnapshot => {
                    post.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAllPost(post)
            })
        return () => subscriber();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={allPost}

            renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.push('NewsDetails_Admin', {item: item})}>
                <ImageBackground
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/bg1.jpg?alt=media&token=3728e649-3efb-4232-bd17-029d729a2da0'}}
                style={styles.news_container} imageStyle={styles.news_container} >
                
                <Image style={{width: 360, height: 200, margin: 10}} source={{uri: item.image}} />

                <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 22, margin: 10}}>{item.title}</Text>

                </ImageBackground>
                </TouchableOpacity>
            )}
            />
        </View>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout)
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1dc9d3'
    },
    news_container: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: '#D2D2D2',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        height: 340,
        width:380,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20
    }
})

export default News;

