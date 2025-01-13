import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import onBoardingScreen from '../screens/onBoardingScreen';
import ExitScreen from '../screens/ExitScreen';
import EntryScreen from '../screens/EntryScreen';
import AllEntriesScreen from '../screens/AllEntriesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="onBoard" component={onBoardingScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Exit" component={ExitScreen} />
        <Stack.Screen name="Entries" component={AllEntriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
