import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Schedule() {
    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ uri: 'https://docs.google.com/spreadsheets/d/1SDHqkTN2Fe92_QzxulPZ2KzPRIF05IKQdOLB8dPcOWE/view#gid=2127881730l' }}
                style={styles.webView}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    webView: {
        flex: 1,
    },
});