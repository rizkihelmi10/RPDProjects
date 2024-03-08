import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ChatBox from './screens/ChatBox';
import Schedule from './screens/Schedule';
import { StyleSheet } from 'react-native';


//Screen names
const homeName = "Home";
const chatBox = "Chatbox";
const schedule = "Schedule";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let rn = route.name;

    if (rn === homeName) {
      iconName = focused ? 'home' : 'home-outline';
    } else if (rn === chatBox) {
      iconName = focused ? 'list' : 'list-outline';
    } else if (rn === schedule) {
      iconName = focused ? 'settings' : 'settings-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'white',
  tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
  tabBarStyle: { backgroundColor: 'black' },
  headerStyle: {
    backgroundColor: 'black', // Set background color of the upper bar
  }, // Set background color of the navigation bar
  headerTintColor: 'white', // Set color of the header text
});

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={screenOptions}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={chatBox} component={ChatBox} />
        <Tab.Screen name={schedule} component={Schedule} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
