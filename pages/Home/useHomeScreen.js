
import axios from 'axios';
//This is an example code for Bottom Navigation//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EndPoint from '../../config/endpoint';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import Onesignal
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

const useHomeScreen=()=>{
    const [username, setUsername] = useState('Dwayne');
    const [pass, setPass] = useState('med1xsoft');
    const [email, setEmail] = useState('Danny');
    const [name, setName] = useState('Dwayne Rock Johnson');
    const [pushToken, setPushToken] = useState('');
    const [userId, setUserId] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [channel, setChannel] = useState('');
    const [groups, setGroups] = useState([]);
    const ep = new EndPoint();
    const navigation = useNavigation();
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

    useEffect(() => {
        console.log(`Data push Token ${pushToken}`);
    }, [pushToken]);
 
    fetch_login= (username, pass, pushToken) =>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(ep.post_login(), {
            user: username,
            password: pass
        }, axiosConfig).then(async res => {
            console.log(" fetch_login : ", JSON.stringify(res.data, null, 2));
            if (res.data.status == "success") {
                setUserId(res.data.data.userId);
                setAuthToken(res.data.data.authToken);

                let axiosConfig = {
                    headers: {
                        'X-Auth-Token': res.data.data.authToken,
                        'Content-Type': 'application/json',
                        'X-User-Id': res.data.data.userId,
                    }
                };
                axios.post(ep.post_pushToken(), {
                    type: "gcm",
                    value: pushToken,
                    appName: "com.belajartab"

                }, axiosConfig).then(async res => {
                    console.log(" fetch_token : ", JSON.stringify(res.data, null, 2));
                    if (res.data.status == "success") {
                        console.log(` Token Sukses `);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                        // console.log(`${EndPoint().get_login()}`);
                    });


            }
            //fetch_token(userId, authToken);
        })
            .catch(function (error) {
                console.log(error);
                // console.log(`${EndPoint().get_login()}`);
            });

        }
    


    fetch_register = (username, pass, email, name) =>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(ep.post_register(), {
            username: username,
            pass: pass,
            name: name,
            email: email
        }, axiosConfig).then(async res => {
            console.log(" fetch_login : ", JSON.stringify(res.data, null, 2));
            if (res.data.status == "success") {
                // props.navigation.navigate('Chat')
            }
        })
            .catch(function (error) {
                console.log(error);
                // console.log(`${EndPoint().get_login()}`);
            });
    }
    
    fetch_channelList = () => {
        let data = '';
        var config = {
            method: 'get',
            url: ep.post_channelList(),
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(`Data Channel List : ${JSON.stringify(response.data, null, 2)}`);
                setChannel(response.data.channels[0].name);
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log(`ini channel ${channel}`);
    }

    fetch_groupList = () => {
        let data = '';
        var config = {
            method: 'get',
            url: ep.get_groupList(),
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(`Data Group List : ${JSON.stringify(response.data, null, 2)}`);
                setGroups(response.data.groups);
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log(`ini channel ${groups}`);
    }

    fetch_groupHistory=(roomId)=>{
    var data = '';

    var config = {
        method: 'get',
        url: ep.get_historyChat(roomId),
        headers: {
            'X-Auth-Token': authToken,
            'X-User-Id': userId
        },
        data: data
        
    };
    axios(config)
        
        .then(function (response) {
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return [username,setUsername, pass,setPass, name,setName, email, 
        setEmail, pushToken,setPushToken, fetch_login, fetch_register, 
        fetch_channelList, fetch_groupList, channel, groups];
}
export default useHomeScreen;