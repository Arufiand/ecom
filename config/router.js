import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import HomeScreen from '../pages/Home/HomeScreen';
import ChatScreen from '../pages/Chat/ChatScreen';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={HomeScreen} />
                <Stack.Screen name="Chat" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={ChatScreen}/>
        </Stack.Navigator>
    )
}

export default Router