import React, {component} from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../../pages/Home/HomeScreen';
// import { transition_config } from '../transition_config';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: transition_config,
                    close: transition_config,
                },
            }} component={Home} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;