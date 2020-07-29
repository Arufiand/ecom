import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import label from './config/local_label_storage'

//import Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons';



//import react navigation
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomeNavigator from './config/navigator/homeNavigator';
import LoginNavigator from './config/navigator/loginNavigator';

import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();


const App=({navigation})=>{

  const [pushToken, setPushToken] = useState('');




  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {
          pushToken == null ? (
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
          ) : (
              // User is signed in
              <Stack.Screen name="HomeNavigator"
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  
                }}
                component={HomeNavigator} />
            )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;