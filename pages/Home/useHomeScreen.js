
import axios from 'axios';
//This is an example code for Bottom Navigation//
import React, { useEffect, useState } from 'react';
import EndPoint from '../../config/endpoint';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const useHomeScreen=()=>{
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pushToken, setPushToken] = useState('');
    const [userId, setUserId] = useState('');
    const [authToken, setAuthToken] = useState('');
    const ep = new EndPoint();

    fetch_login= (username, pass, pushToken) =>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post("http://172.16.2.20/api/v1/login", {
            user: username,
            password: pass
        }).then(async res => {
            console.log(" fetch_login : ", JSON.stringify(res.data, null, 2));
            if (res.data.status == "success") {
                // setUserId(res.data.data.userId);
                // setAuthToken(res.data.data.authToken);

                let axiosConfig = {
                    headers: {
                        'X-Auth-Token': res.data.data.authToken,
                        'Content-Type': 'application/json',
                        'X-User-Id': res.data.data.userId,
                    }
                };
                axios.post("http://172.16.2.20/api/v1/push.token", {
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
        axios.post("http://172.16.2.20/api/v1/users.register", {
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
    return [username,setUsername, pass,setPass, name,setName, email, setEmail, pushToken,setPushToken, fetch_login, fetch_register];
}
export default useHomeScreen;