import React from 'react';
import { View, Text } from 'react-native';
import NavBar from 'src/components/NavBar';

const HomeScreen = () => {
  return (
    <View>
      <NavBar 
        title="Home" 
        leftIcon="Back" 
        onLeftPress={() => console.log('Back button pressed')} 
        rightIcon="Menu" 
        onRightPress={() => console.log('Menu button pressed')} 
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Home Screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;