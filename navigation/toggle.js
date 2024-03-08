import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ToggleMenuHeader = ({ navigation }) => {
  const toggleMenu = () => {
    // Implement your toggle menu logic here
    console.log('Toggle menu button pressed');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Your App Title</Text>
    </View>
  );
};

export default ToggleMenuHeader;
