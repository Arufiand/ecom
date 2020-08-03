
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
//This is an example code for Bottom Navigation//
import { useEffect, useState } from 'react';
//import Onesignal
import OneSignal from 'react-native-onesignal';
import EndPoint from '../../config/endpoint';
import label from '../../config/local_label_storage'

const useHomeScreen=()=>{
    const [username, setUsername] = useState('Dwayne');
    const [pass, setPass] = useState('med1xsoft');
    const [email, setEmail] = useState('Danny');
    const [name, setName] = useState('Dwayne Rock Johnson');
    
    const [rcAuthToken, setRcAuthToken] = useState('');
    const [rcUserId, setRcUserId] = useState('');
    const [channel, setChannel] = useState('');
    const [groups, setGroups] = useState([]);
    const ep = new EndPoint();
    const navigation = useNavigation();
    
    fetch_login= async (username, pass, OneSignalPushToken) =>{
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


                try {
                    setRcUserId(res.data.data.userId)
                    await AsyncStorage.setItem(label.rc_user_id, res.data.data.userId);
                    setRcAuthToken(res.data.data.authToken)
                    await AsyncStorage.setItem(label.rc_user_auth_token, res.data.data.authToken);
                    await AsyncStorage.setItem(label.rc_user_name, res.data.data.me.name);
                    await AsyncStorage.setItem(label.rc_user_username, res.data.data.me.username);
                    
                    
                }
                catch(err) {
                    console.log(err);
                }
                let axiosConfig = {
                    headers: {
                        'X-Auth-Token': res.data.data.authToken,
                        'Content-Type': 'application/json',
                        'X-User-Id': res.data.data.userId,
                    }
                };
                axios.post(ep.post_pushToken(), {
                    type: "gcm",
                    value: OneSignalPushToken,
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

    fetch_groupList = () => {
        console.log(`ini Auth Token ${rcAuthToken}`);
        console.log(`ini User Id ${rcUserId}`);

        let data = '';
        var config = {
            method: 'get',
            url: ep.get_groupList(),
            headers: {
                'X-Auth-Token': rcAuthToken,
                'X-User-Id': rcUserId
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

    fetch_groupHistory= async (roomId)=>{
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
        setEmail, fetch_login, fetch_register, fetch_groupList, groups];
}
export default useHomeScreen;