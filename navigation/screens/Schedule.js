import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// Only import WebView if not on web platform
const WebViewComponent = Platform.OS === 'web' ? null : WebView;

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(true);

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
            src={`https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiE12FRYXwdS-OZeYKhCCmrGrui-wY18BdJ_i0qrRctyGWavoOu6OD4uRs_WEwXOCAgN3MAt-ba-B/pubhtml?gid=0&single=true&rm=minimal`}
            style={{ border: 'none', width: '100%', height: '100%' }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebViewComponent
        source={{
          uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiE12FRYXwdS-OZeYKhCCmrGrui-wY18BdJ_i0qrRctyGWavoOu6OD4uRs_WEwXOCAgN3MAt-ba-B/pubhtml?gid=0&single=true&rm=minimal',
        }}
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
