import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatScreen from '../pages/Chat/ChatScreen';
import HomeScreen from '../pages/Home/HomeScreen';
import MainMenuScreen from '../pages/MainMenu/MainMenuScreen';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} screenOptions={{
                headerShown: false
            }} />
            <Stack.Screen name="MainMenu" component={MainMenuScreen} screenOptions={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default Router