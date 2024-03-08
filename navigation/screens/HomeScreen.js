import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import VostcastPlayer from '../screens/VostcastPlayer'; // Corrected import path
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.posterContainer}>
                <Image
                    source={require('../../navigation/screens/image0.jpeg')}
                    style={styles.posterImage}
                />
            </View>
            <WebView
                originWhitelist={['file://*']}
                source={{
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                background-color: black;
                                margin: 0;
                                padding: 0;
                            }
                    
                            .container {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                height: 100%;
                                width: 100%;
                            }
                    
                            .player-container {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                            }
                    
                            .player-name {
                                color: white;
                                font-size: 20px; /* Adjust font size */
                                margin-top: 100px; /* Adjust margin */
                            }
                            .player {
                                width: 700px; 
                                height: 1150px; 
                            }
                    
                         
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="player-container">
                                
                                <iframe src="https://cdn.voscast.com/player/player.php?host=s1.voscast.com&port=8080&mount=/stream&autoplay=true&icecast=false" width="150" height="30" frameborder="0" scrolling="no" allow="autoplay"></iframe>
                                <div class="player-name">Click Play to play the radio</div>
                            </div>
                        </div>
                    </body>
                    </html>
                    `,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    posterContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    posterImage: {
        width: 300,
        height: 300,
    },
    webView: {
        flex: 1,
    },
});
