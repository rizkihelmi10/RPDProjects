import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Schedule() {
    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiE12FRYXwdS-OZeYKhCCmrGrui-wY18BdJ_i0qrRctyGWavoOu6OD4uRs_WEwXOCAgN3MAt-ba-B/pubhtml?gid=0&single=true&rm=minimal' }}
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