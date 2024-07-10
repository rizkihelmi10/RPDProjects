import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';

// Only import WebView if not on web platform
const WebView = Platform.OS === 'web' ? null : require('react-native-webview').WebView;

export default function ChatBox() {
  const [isLoading, setIsLoading] = useState(true);

  const webViewContent = `
  <html>
    <head>
      <style>
        body {
          background-color: #000;
          color: #fff;
        }
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes">
    </head>
    <body>
      <script id="cid0010000156280366624" data-cfasync="false" async="" src="https://st.chatango.com/js/gz/emb.js" style="width:100%;height:100%;">{"handle":"radioppiduniachat","arch":"js","styles":{"a":"#FFFFF","b":100,"c":"000000","d":"FFFFFF","k":"000000","l":"000000","m":"000000","n":"FFFFFF","q":"404041","r":100,"p":10,"cnrs":0.25,"usricon":0.75}}</script>
    </body>
  </html>
  `;

  const renderLoadingView = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Simulate loading for web
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          renderLoadingView()
        ) : (
          <iframe
            src={`data:text/html;charset=utf-8,${encodeURIComponent(webViewContent)}`}
            style={{ border: 'none', width: '100%', height: '100%' }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: webViewContent }}
        javaScriptEnabled={true}
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
        onLoadEnd={() => {
          if (isLoading) {
            setIsLoading(true);
          }
        }}
        renderLoading={renderLoadingView}
        startInLoadingState={true}
      />
    </View>
  );
}