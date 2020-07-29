import React, { component } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Chat from '../../pages/Chat/ChatScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Chat" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

            }} component={Chat} />
        </Stack.Navigator>
    );
}

export default ChatNavigator;