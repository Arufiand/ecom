import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

//import Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons';

//import react navigation
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './pages/HomeScreen';
import SettingsScreen from './pages/SettingsScreen';
import DetailsScreen from './pages/DetailsScreen';
import CalculatorScreen from './pages/CalculatorScreen';
import EcomScreen from './pages/EcomScreen';
import ChatScreen from './pages/Chat/ChatScreen';
import AnimatedTabBar, {TabsConfig, BubbleTabBarItemConfig} from '@gorhom/animated-tabbar';

const CalculatorStack = createStackNavigator(
  {
    //Definisi Navigasi
    Calculator: { screen: CalculatorScreen },
    Details: { screen: DetailsScreen },
  },
  {
    defaultNavigationOptions: {
      //Untuk Header
      headerStyle: {
        backgroundColor: '#42f44b', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      headerTintColod: '#FFFFFF',
      title: 'Calculator',
    },
  }
);

const HomeStack = createStackNavigator(
  {
    //Definisi Navigasi
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
  },
  {
    defaultNavigationOptions: {
      //Untuk Header
      headerStyle: {
        backgroundColor: '#42f44b', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      headerTintColod: '#FFFFFF',
      title: 'Home',
    },
  }
);

const EcomStack = createStackNavigator(
  {
    //Definisi Navigasi
    Ecom: { screen: EcomScreen },
  },
  {
    defaultNavigationOptions: {
      //Untuk Header
      headerStyle: {
        backgroundColor: '#42f44b', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      headerTintColod: '#FFFFFF',
      title: 'Ecommerce',
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    //Pendefinisian Halaman Settings
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
    Calculator: { screen: CalculatorScreen },
  },
  {
    defaultNavigationOptions: {
      //header untuk Settings dan sejenis
      headerStyle: {
        backgroundColor: '#42f44b', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings',
    },
  }
);

const ChatStack = createStackNavigator(
  {
    //Definisi Navigasi
    Chat: { screen: ChatScreen },
  },
  {
    defaultNavigationOptions: {
      //Untuk Header
      headerStyle: {
        backgroundColor: '#42f44b', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      },
      headerTintColod: '#FFFFFF',
      title: 'Chatting',
    },
  }
);

const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
    Calculator: { screen: CalculatorStack },
    Ecom: { screen: EcomStack },
    Chat: { screen: ChatStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `settings${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Calculator') {
          iconName = `calculator${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Ecom') {
          iconName = `cart${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Chat') {
          iconName = `chatbubbles${focused ? '' : '-outline'}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray', shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
  }
);

export default createAppContainer(App);