import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const playAudio = () => {
        try {
            const soundObject = new Audio.Sound();
            soundObject.loadAsync(
                { uri: 'http://s1.voscast.com:8080/stream' },
                { shouldPlay: true }
            );
            soundObject.setOnPlaybackStatusUpdate(status => {
                if (status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
            setSound(soundObject);
            setIsPlaying(true);
        } catch (error) {
            console.error('Failed to load the audio:', error);
        }
    };
    
    const pauseAudio = () => {
        if (sound) {
            sound.pauseAsync();
            setIsPlaying(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.posterContainer}>
                <Image
                    source={require('../../navigation/screens/image0.jpeg')}
                    style={styles.posterImage}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={playAudio}>
                    <AntDesign name="playcircleo" size={64} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pauseAudio}>
                    <AntDesign name="pausecircleo" size={64} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 110,
    },
    posterImage: {
        width: 300,
        height: 300,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 150,
    },
    button: {
        marginHorizontal: 5, // Adjust the horizontal gap as needed
    },
});

export default HomeScreen;
