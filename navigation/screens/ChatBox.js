import * as React from 'react';
import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ChatBox() {
  const [isLoading, setIsLoading] = useState(true);

  const injectJavaScript = `
    document.body.style.backgroundColor = '#000'; // Set background color to black
    document.body.style.color = '#fff'; // Set text color to white
  `;

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
  <script id="cid0010000156280366624" data-cfasync="false" async="" src="https://st.chatango.com/js/gz/emb.js" style="width:100%;height:100%;">{"handle":"radioppiduniachat","arch":"js","styles":{"a":"#000000","b":100,"c":"000000","d":"FFFFFF","k":"000000","l":"000000","m":"000000","n":"FFFFFF","q":"404041","r":100,"p":10,"cnrs":0.25,"usricon":0.75}}</script>
</body>
</html>
  
  `;

  const renderLoadingView = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: webViewContent }}
        javaScriptEnabled={true}
        injectedJavaScript={injectJavaScript}
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
        onLoadEnd={() => {
          if (isLoading) {
            // Reload WebView until fully loaded
            setIsLoading(true);
          }
        }}
        renderLoading={renderLoadingView}
        startInLoadingState={true}
      />
    </View>
  );
}
