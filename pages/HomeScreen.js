//This is an example code for Bottom Navigation//
import React, {useEffect, useState} from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used
import FlexBox from './FlexBox';
import * as useHomeScreen from './useHomeScreen';
import axios from 'axios';
//import Onesignal
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import EndPoint from '../config/endpoint';
import label from '../config/local_label_storage'
import { lessOrEq } from 'react-native-reanimated';

const HomeScreen = (props) => {

// const[username, setUsername] = useState('admin');
// const[pass, setPass] = useState('adminadmin');
const[username, setUsername] = useState('dwayne');
const [pass, setPass] = useState('Med1xsoft');
const[email, setEmail] = useState('dwayne@Danny.com');
const[name, setName] = useState('Dwayne Rock Johnson');
const[pushToken, setPushToken] = useState('');
const[userId, setUserId] = useState('');
const[authToken, setAuthToken] = useState('');
const ep = new EndPoint();


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
                setPushToken(device.pushToken);
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
            OneSignal.init("14092b00-09d4-48e0-9218-5ec4c3a49c7f");
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

    useEffect(() =>{
        console.log(`Data push Token ${pushToken}`);
    }, [pushToken]);

    return (
       <View>
           <ScrollView>
                <Text style={{ marginTop: 50, fontSize: 25, alignItems:'center' }}>Home!</Text>
                <View
                    style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => ep.fetch_login(username, pass, pushToken)}>
                        <Text>Hardcode Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => ep.fetch_register(username, pass, email, name)}>
                        <Text>Hardcode Register</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => fetch_token()}>
                        <Text>Hardcode Token</Text>
                    </TouchableOpacity> */}
                </View>
           </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        marginTop: 20,
        borderRadius: 20,
        justifyContent : 'center'
    },
    container: {
        flex: 1,
        width : '100%',
        height: '30%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius : 500/2,
        backgroundColor: '#7F00FF',
        position: 'absolute',
        left: -150,
        top: -20

    }
});