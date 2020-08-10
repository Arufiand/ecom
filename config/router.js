import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatScreen from '../pages/Chat/ChatScreen';
import HomeScreen from '../pages/Home/HomeScreen';
import TutorialScreen from '../pages/Tutorial/TutorialScreen';

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
                <Stack.Screen name="Tutorial" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} component={TutorialScreen}/>
        </Stack.Navigator>
    )
}

export default Router