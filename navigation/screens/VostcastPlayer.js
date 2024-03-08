import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Vostcast() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
               originWhitelist={['*']}
               source={{ html: '<script style="width:100%; background: red;" type="text/javascript" src="https://cdn.voscast.com/player/?key=31b8dac67aae02545f7e5a44e2f8ec7c"></script>' }}       
      />
    </View>
  );
}
