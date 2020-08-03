import React, { useEffect, useState } from 'react';

//import react navigation
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Router from './config/router';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import label from './config/local_label_storage';

const Stack = createStackNavigator();

const App=({navigation})=>{

  /**
 http://172.16.2.20/api/v1/login
{
   "user" : "Badui",
   "pass" : "med1xsoft"
}
 http://172.16.2.20/api/v1/users.register
{
   "username" : "Danny",
   "email" : "Arufiand@gmail.com",
   "pass" : "med1xsoft",
   "name" : "Arufiand"
}
**/

  /**
 * This useEffect for OneSignal Only
 * app ids on Label Local Storage
*/
  useEffect(() => {

    const onReceived = (notification) => {
      // console.log("Notification received: ", notification);
      dispatchNotif({ type: "NOTIFICATION_RECEIVED", notification });
      setNotifComing(true);
    }

    const onOpened = (openResult) => {
      console.log('Message -> ', JSON.stringify(openResult.notification.payload.body, null, 2));
      console.log('Data -> ', JSON.stringify(openResult.notification.payload.additionalData, null, 2));
      console.log('isActive -> ', JSON.stringify(openResult.notification.isAppInFocus, null, 2));
      console.log('openResult -> ', JSON.stringify(openResult, null, 2));
    }

    const onIds = async (device) => {
      console.log(`Device info: -> ${JSON.stringify(device, null, 2)}`);
      // console.log(`Push Token Device -> ${JSON.stringify(device.pushToken,null,2)}`);
      await AsyncStorage.getItem("signal_id").then(async (result) => {
        // setPushToken(device.pushToken);
        if (result == null) {
          // console.log("There is no OneSignal ID");
          await AsyncStorage.setItem(label.onesignal_id, device.userId);
          await AsyncStorage.setItem(label.onesignal_push_token, device.pushToken);
        } else {
          console.log("Already have OneSignal ID");
        }
        // console.log(`ini onesignal push token simpan : ${pushToken}`);
      });
    }

    const initOneSignal = () => {
      // console.log("Init OneSignal ID");
      OneSignal.init(label.onesignal_init_id);
      // Disable Message Box
      OneSignal.inFocusDisplaying(0);
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    };

    initOneSignal();

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  }, []);

    // useEffect(() => {
    //     console.log(`Data push Token ${pushToken}`);
    // }, [pushToken]);

  return(
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App;