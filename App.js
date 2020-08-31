import AsyncStorage from '@react-native-community/async-storage';
//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import OneSignal from 'react-native-onesignal';
import label from './config/local_label_storage';
import Router from './config/router';
import endpoint from './config/endpoint';
import AppContext from './config/appContext';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const ep = new endpoint();
  const ws = new WebSocket(ep.ws_connection())
  const [response, setResponse] = useState('')
  const [chat, setChat] = useState('')
  const [card, setCard] = useState([''])
  useEffect(() => {

    const ws_open = () => {
      ws.onopen = () => {
        try {
          ws.send(ep.ws_rocket_chat_conn());
          console.log(`socket connected!`);
        } catch (error) {
          console.log(JSON.stringify(error,null,2));
        }
      }
    }

    const ws_close = () => {
      ws.onclose = () => {
        console.log(`Socket Disconected!`);
        try {
          ws_open()
        } catch (error) {
          console.log(error);
        }
      }
    }

    const ws_onMessage = () => {
      ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data)
        setResponse(message)
        console.log(`ini isi message ${JSON.stringify(message, null, 2)}`);
        if (message.msg == "ping") {
          ws.send(ep.ws_rocket_ping())
        }
        if (message.msg == "changed" && message.collection == "stream-room-messages") {
          setChat(message);
        }
        if (message.msg == "result") {
          setChat(message);
        }
      }
    }

    ws_open()
    try {
      ws_onMessage()
    }
    catch (error) {
      ws_close()
    }


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
      // console.log(`Device info: -> ${JSON.stringify(device, null, 2)}`);
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

  const authContext = useMemo(
    () => ({
      onSendRocketChat: data => {
        ws.send(data);
        console.log("On send rocket chat function");
      }
    }), []);

  // useEffect(() => {
  //     console.log(`Data push Token ${pushToken}`);
  // }, [pushToken]);

  return (
    <AppContext.Provider value={{ authContext, response, card, chat }}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AppContext.Provider>
  )
}

export const useStore = () => useContext(AppContext);

export default App;