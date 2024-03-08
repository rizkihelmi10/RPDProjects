// src/components/NavBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavBar = ({ title, onLeftPress, leftIcon, onRightPress, rightIcon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButton} onPress={onLeftPress}>
        <Text style={styles.buttonText}>{leftIcon}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
        <Text style={styles.buttonText}>{rightIcon}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  leftButton: {
    marginRight: 10,
  },
  rightButton: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default NavBar;
