import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './Screens/SignupScreen';
import LoginScreen from './Screens/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack

const styles = StyleSheet.create({})
