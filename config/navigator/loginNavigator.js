import React, { component } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../../pages/Login/loginScreen';

const Stack = createStackNavigator();

const loginNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Login" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                
            }} component={Login} />
        </Stack.Navigator>
    );
}

export default loginNavigator;