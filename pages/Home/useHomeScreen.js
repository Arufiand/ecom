
import axios from 'axios';
//This is an example code for Bottom Navigation//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EndPoint from '../../config/endpoint';
import chatNavigator from '../../config/navigator/chatNavigator'
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ChatNavigator from '../Chat/ChatScreen';

const useHomeScreen=()=>{
    const [username, setUsername] = useState('dwayne');
    const [pass, setPass] = useState('Med1xsoft');
    const [email, setEmail] = useState('dwayne');
    const [name, setName] = useState('');
    const [pushToken, setPushToken] = useState('');
    const [userId, setUserId] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [channel, setChannel] = useState('');
    const [groups, setGroups] = useState([]);
    const ep = new EndPoint();
    const navigation = useNavigation();


    fetch_login= (username, pass, pushToken) =>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(ep.post_login(), {
            user: username,
            password: pass
        }).then(async res => {
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
        }).then(async res => {
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
    // fetch_groupHistory = () => {
    //     let data = '';
    //     let roomId ='';
    //     var config = {
    //         headers: {
    //             'X-Auth-Token': "HoqVTKNYab_g_Z2FFKRaxHF55hJaRwcB3CfB9jwa8tY",
    //             'X-User-Id': "AWNyZZzbKEfa3iwAY"
    //         },
    //         data: data
    //     };

    //     axios.get(ep.get_historyChat(roomId), {
    //         roomId : roomId
    //     }).then(async res => {
    //         console.log(" fetch_login : ", JSON.stringify(res.data, null, 2));
    //         if (res.data.status == "success") {
    //             // props.navigation.navigate('Chat')
    //         }
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //             // console.log(`${EndPoint().get_login()}`);
    //         });
    // }

    fetch_groupHistory=(roomId)=>{
    var data = '';

    var config = {
        method: 'get',
        // url: `http://172.16.2.20/api/v1/groups.history?roomId=y7ERtLHw8NR4MDRae`,
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