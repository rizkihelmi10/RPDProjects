import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [posterImageSource, setPosterImageSource] = useState(require('../../navigation/screens/Logo.png'));

  const webViewContent = `
    <html>
      <head>
        <style>
          .server {
            color: white;
            font-size: 20px;
            margin-top: 50px; 
            margin-bottom: 50px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="server">
          <script type="text/javascript" src="https://cdn.voscast.com/stats/display.js?key=31b8dac67aae02545f7e5a44e2f8ec7c&stats=servertitle"></script>
        </div>
      </body>
    </html>
  `;

  useEffect(() => {
    if (Platform.OS === 'web') {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

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

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={styles.posterContainer}>
          <Image source={posterImageSource} style={styles.posterImage} />
          {isBuffering && <ActivityIndicator size="large" color="black" />}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <View style={{ flex: 1, width: '100%' }}>
              <iframe
                src={`data:text/html;charset=utf-8,${encodeURIComponent(webViewContent)}`}
                style={{ width: '100%', height: '60%', flex: 1, marginTop: -150 }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={playAudio}>
                  <AntDesign name="playcircleo" size={64} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pauseAudio}>
                  <AntDesign name="pausecircleo" size={64} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <View style={styles.posterContainer}>
          <Image source={posterImageSource} style={styles.posterImage} />
          {isBuffering && <ActivityIndicator size="large" color="black" />}
        </View>
      )}
      <View style={styles.webViewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: webViewContent }}
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
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  posterContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  button: {
    marginHorizontal: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  webView: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;