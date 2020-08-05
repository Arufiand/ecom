import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import HomeScreen from '../pages/Home/HomeScreen';
import ChatScreen from '../pages/Chat/ChatScreen';
import TutorialScreen from '../pages/Tutorial/TutorialScreen';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Tutorial"
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={HomeScreen} />
                <Stack.Screen name="Chat" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={ChatScreen}/>
                <Stack.Screen name="Tutorial" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={TutorialScreen}/>
        </Stack.Navigator>
    )
}

export default Router