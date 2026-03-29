/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentListScreen from './src/screens/StudentListScreen';
import StudentFormScreen from './src/screens/StudentFormScreen';
import { BottomTabParamList } from './src/navigation/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2194f0',
          tabBarInactiveTintColor: '#000000',

          // Center the text vertically
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            lineHeight: 18, // match fontSize
            margin: 0,
            padding: 0,
            textAlign: 'center',
            position: 'absolute', // force tab bar to stay on bottom
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            elevation: 0,
            backgroundColor: '#fff',
          },

          tabBarIcon: () => null, // remove icons

          // Reduce default padding so label is centered
          tabBarStyle: {
            height: 90,
            paddingTop: 0,
            paddingBottom: 0,
            justifyContent: 'center', // center vertically
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={StudentListScreen}
          options={{
            tabBarIcon: () => null,
            tabBarLabel: 'Dashboard', // optional, default is name
            tabBarLabelStyle: {
              fontSize: 16, // increase text size
              textAlign: 'center', // center text under icon
              fontFamily: 'Poppins-Regular', // optional if using your custom font
            },
          }}
        />
        <Tab.Screen
          name="Form"
          component={StudentFormScreen}
          options={{
            tabBarIcon: () => null,
            tabBarLabel: 'Form', // optional, default is name
            tabBarLabelStyle: {
              fontSize: 16, // increase text size
              textAlign: 'center', // center text under icon
              fontFamily: 'Poppins-Regular', // optional if using your custom font
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
