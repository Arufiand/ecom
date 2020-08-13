
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
//This is an example code for Bottom Navigation//
import { useState } from 'react';
import { useStore } from '../../App';
import EndPoint from '../../config/endpoint';
import label from '../../config/local_label_storage';

const useHomeScreen=()=>{
    const [username, setUsername] = useState('Dwayne');
    const [pass, setPass] = useState('med1xsoft');
    const [email, setEmail] = useState('Danny');
    const [name, setName] = useState('Dwayne Rock Johnson');
    
    const [rcAuthToken, setRcAuthToken] = useState('');
    const [rcUserId, setRcUserId] = useState('');
    const [channel, setChannel] = useState('');
    const [groups, setGroups] = useState([]);
    const [subtitle, setSubtitle] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const ep = new EndPoint();
    const navigation = useNavigation(); 
    
    
    const { authContext, response } = useStore();

    
    
    

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
                    authContext.onSendRocketChat(ep.ws_rocket_login_token(res.data.data.authToken));
                    console.log(`token berhasil`);
                    try {
                        authContext.onSendRocketChat(ep.ws_rocket_stream_notify_user(res.data.data.userId, ["message", "notification", "subscriptions-changed"]));
                        console.log(`notify user berhasil`);
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }


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
                // let axiosConfig = {
                //     headers: {
                //         'X-Auth-Token': res.data.data.authToken,
                //         'Content-Type': 'application/json',
                //         'X-User-Id': res.data.data.userId,
                //     }
                // };
                // axios.post(ep.post_pushToken(), {
                //     type: "gcm",
                //     value: OneSignalPushToken,
                //     appName: "com.belajartab"

                // }, axiosConfig).then(async res => {
                //     console.log(" fetch_token : ", JSON.stringify(res.data, null, 2));
                //     if (res.data.status == "success") {
                //         console.log(` Token Sukses `);
                        
                //     }
                // })
                //     .catch(function (error) {
                //         console.log(error);
                //         // console.log(`${EndPoint().get_login()}`);
                //     });


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
                const start = Date.now();
                if(subscribed == false) {
                    try {
                        for (let msg of response.data.groups) {
                            const chat = {
                                _id: msg._id,
                                name: msg.name
                            }
                            let randomId = chat._id+start;
                            authContext.onSendRocketChat(ep.ws_rocket_stream_room_message(randomId, chat._id));
                        }                    
                    } catch (err) {
                        console.log(err);
                    }
                    setSubscribed(true);
                 }
                 else if (subscribed == true) {
                     console.log(`history has been subscribed!`);
                 }
            })
            .catch(function (error) {
                console.log(error);
            });
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
        .catch(function (error) {
            console.log(error);
        });
    }

    return [username,setUsername, pass,setPass, name,setName, email, 
        setEmail, fetch_login, fetch_register, fetch_groupList, groups, rcAuthToken,rcUserId, subtitle];
}
export default useHomeScreen;