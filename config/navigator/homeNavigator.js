import React, {component} from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../../pages/Home/HomeScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                
            }} component={Home} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;