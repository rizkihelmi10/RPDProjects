import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamName, setStreamName] = useState('');
  const [isBuffering, setIsBuffering] = useState(false);
  const [posterImageSource, setPosterImageSource] = useState(require('../../navigation/screens/Logo.png'));

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'http://s1.voscast.com:8080/stream' },
          { shouldPlay: false }
        );
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(sound);
      } catch (error) {
        console.error('Failed to load the audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isBuffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
      if (status.didJustFinish) {
        setIsPlaying(false);
        showToast('Radio paused');
      }
    }
  };

  const playAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
        showToast('Radio playing');
      } else {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'http://s1.voscast.com:8080/stream' },
          { shouldPlay: true, progressUpdateIntervalMillis: 100 }
        );
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(sound);
        setIsPlaying(true);
        showToast('Radio playing');
      }
    } catch (error) {
      console.error('Failed to play the audio:', error);
    }
  };
  
  

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      showToast('Radio paused');
    }
  };

  const showToast = (message) => {
    Toast.show({
      type: 'info',
      text1: message,
    });
  };
  const handleWebViewMessage = (event) => {
    const data = event.nativeEvent.data;
  
    switch (true) {
      case data.includes('Dunia Kuliner'):
        setPosterImageSource(require('../../navigation/screens/dukunn.png'));
        break;
      case data.includes('Hallyu Radio'):
        setPosterImageSource(require('../../navigation/screens/Hallyu Radio Poster.png'));
        break;
      case data.includes('Diskografi'):
        setPosterImageSource(require('../../navigation/screens/diskografi.jpeg'));
        break;
      case data.includes('Kutu Buku'):
        setPosterImageSource(require('../../navigation/screens/kutubuku.jpg'));
        break;
      case data.includes('Sepak Bola'):
        setPosterImageSource(require('../../navigation/screens/sepakbola.jpeg'));
        break;
      case data.includes('Seputar Obrolan Psikologi'):
        setPosterImageSource(require('../../navigation/screens/seputar.jpeg'));
        break;
      case data.includes('Cozy Afternoon'):
        setPosterImageSource(require('../../navigation/screens/cozyafternoon.jpeg'));
        break;
      case data.includes('Suka Sama'):
        setPosterImageSource(require('../../navigation/screens/sukasama.jpeg'));
        break;
      case data.includes('Jalan jalan santai'):
        setPosterImageSource(require('../../navigation/screens/jjs.jpeg'));
        break;
      case data.includes('Biografi'):
        setPosterImageSource(require('../../navigation/screens/bigfics.jpg'));
        break;
      case data.includes('Bahasa Jiwa'):
        setPosterImageSource(require('../../navigation/screens/bahasajiwa.jpeg'));
        break;
      default:
        setPosterImageSource(require('../../navigation/screens/Logo.png'));
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
      <Image source={posterImageSource} style={styles.posterImage} />
        {isBuffering && <ActivityIndicator size="large" color="white" />}
      </View>
      <View style={styles.webViewContainer}>
        <WebView
          originWhitelist={['*']}
          source={require('../../assets/servertitle.html')}
          style={styles.webView}
          onMessage={handleWebViewMessage}
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
    justifyContent: 'center', // Center components vertically
    alignItems: 'center',
  },
  posterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, // Reduced top margin
  },
  posterImage: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180, // Reduced bottom margin
  },
  button: {
    marginHorizontal: 10,
  },
  webViewContainer: {
    flex: 1, // Increased the height of the WebView container
    backgroundColor: 'black',
    marginTop: 100, // Reduced top margin
    width: '100%',
  },
  webView: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;
