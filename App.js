import React, { useEffect, useState } from 'react';

//import react navigation
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Router from './config/router';

const Stack = createStackNavigator();

const App=({navigation})=>{
  return(
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App;