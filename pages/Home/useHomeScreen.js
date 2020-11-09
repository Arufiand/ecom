
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
//This is an example code for Bottom Navigation//
import { useState, useEffect } from 'react';
import { useStore } from '../../App';
import EndPoint from '../../config/endpoint';
import label from '../../config/localLabelStorage';

const useHomeScreen = () => {

    const [username, setUsername] = useState('admin');
    const [pass, setPass] = useState('adminadmin');
    const [email, setEmail] = useState('alfiandannyarmanta@gmail.com');
    const [name, setName] = useState('Alfian Danny A');
    const [mainId, setMainId] = useState('080988');
    const [role, setRole] = useState('siswa');
    const [statusLogin, setStatusLogin] = useState(false);
    const [rcAuthToken, setRcAuthToken] = useState('');
    const [rcUserId, setRcUserId] = useState('');
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [subtitle, setSubtitle] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [incomingNotif, setIncomingNotif] = useState('');
    const [rcUsername, setRcUsername] = useState('');

    const ep = new EndPoint();

    const navigation = useNavigation();


    const { authContext, response, chat, setParamNavigator, paramNavigator} = useStore();

    // useEffect(() => {
    //     //fetch_usersList();
    //     fetch_groupList();
    // }, [chat])

    fetch_auto_login_register = (username, pass, email, name) => {
        var dataLogin = JSON.stringify({ "user": username, "password": pass });

        var configLogin = {
            method: 'post',
            url: ep.post_login(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataLogin
        };
        axios(configLogin)
            .then(async response => {
                fetch_login(username, pass);
                setRcUsername(await AsyncStorage.getItem(label.rc_user_name));
                setStatusLogin(true);
            })
            .catch(function (error) {
                console.log(JSON.stringify(error, null, 2));
                console.log(`Data Username dan Email belum ada! lakukan registrasi`);
                try {
                    console.log(`Ojok Aneh Aneh!`);
                    //fetch_register(username, pass, email, name);
                } catch (error) {
                    console.log(error);
                }
            });
    }
    useEffect(() => {
        setParamNavigator({ rcUserId, rcAuthToken });     
    },[rcUserId, rcAuthToken])

    fetch_login = async (username, pass, email, name) => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(ep.post_login(), {
            user: username,
            password: pass
        }, axiosConfig).then(async res => {
            console.log(" fetch_login : ", JSON.stringify(res.data, null, 4));
            if (res.data.status == "success") {
                try {
                    setTimeout(function () {
                        authContext.onSendRocketChat(ep.ws_rocket_login_token(res.data.data.authToken));
                        console.log(`token berhasil`);
                    }, 15);
                    try {
                        setTimeout(function () {
                            authContext.onSendRocketChat(ep.ws_rocket_stream_notify_user(res.data.data.userId, ["message", "notification", "subscriptions-changed"]));
                            console.log(`notify user berhasil`);
                        }, 10);
                        setRcUserId(res.data.data.userId)
                        setRcAuthToken(res.data.data.authToken)
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }
                try {
                    
                    setTimeout(function () {
                        navigation.navigate('MainMenu',{rcUserId, rcAuthToken});
                    }, 300)
                }
                catch (err) {
                    console.log(err);
                }
            }
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    fetch_register = (username, pass, email, name, mainId, role) => {

        var data = JSON.stringify({ "username": "aldanta", "email": email, "pass": pass, "name": name, "customField": { "main_id": mainId, "user_type": role } });

        var config = {
            method: 'post',
            url: ep.post_register(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setTimeout(function () { fetch_login(username, pass) }, 1500);
            })
            .catch(function (error) {
                console.log(JSON.stringify(error.name, null, 2));
                if (error.name == "Error") {
                    console.log(error);
                    setTimeout(function () { fetch_login(username, pass) }, 1500);
                }
            });
    }

    fetch_logout = () => {
        let data = '';
        var config = {
            method: 'get',
            url: ep.post_logout(),
            headers: {
                'X-Auth-Token': rcAuthToken,
                'X-User-Id': rcUserId
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(`Response Logout ${JSON.stringify(response.data, null, 2)}`);
                setStatusLogin(false);
            })
            .catch(function (error) {
                console.log(error);
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
                //console.log(`Data Group List : ${JSON.stringify(response.data, null, 2)}`);
                setGroups(response.data.groups);
                const start = Date.now();
                if (subscribed == false) {
                    try {
                        for (let msg of response.data.groups) {
                            const chats = {
                                _id: msg._id,
                                name: msg.name
                            }
                            let randomId = chats._id + start;
                            //rconsole.log(`Random ID Grouplist : ${randomId}`);
                            authContext.onSendRocketChat(ep.ws_rocket_stream_room_message(randomId, chats._id));
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

    fetch_usersList = () => {

        var config = {
            method: 'get',
            url: ep.get_usersList(),
            headers: {
                'X-Auth-Token': rcAuthToken,
                'X-User-Id': rcUserId
            }
        };
        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data.users, null, 2));
                const start = Date.now();
                if (subscribed == false) {
                    try {
                        const user = response.data.users.filter(user => user.customFields.user_type == "guru_wali" && user.username != rcUsername).map(user => {
                            //console.log(`${JSON.stringify(user, null, 2)}`);
                            setUsers(prevArray => [...prevArray, user]);
                           // setUsers(response.data.users)
                            const userChat = {
                                _id: user._id,
                                name: user.name,
                                username : user.username
                            }                        
                            //     authContext.onSendRocketChat(ep.ws_create_direct_message(userChat.username))
                            let randomId = userChat._id + start;
                            authContext.onSendRocketChat(ep.ws_rocket_stream_room_message(randomId, userChat._id));   
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
                else if (subscribed == true) {
                    console.log(`history has been subscribed!`);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetch_avatar = (username) => {
        return `http://172.16.200.56:3000/avatar/${username}?size=50`;
    }
    // useEffect(() => {
    //     fetch_groupHistory = async (roomId) => {
    //         var data = '';

    //         var config = {
    //             method: 'get',
    //             url: ep.get_historyChat(roomId),
    //             headers: {
    //                 'X-Auth-Token': authToken,
    //                 'X-User-Id': userId
    //             },
    //             data: data

    //         };
    //         axios(config)
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // }, [chat])

    return [username, setUsername, pass, setPass, name, setName, email,
        setEmail, mainId, setMainId, role, setRole, fetch_login, fetch_register, fetch_groupList, fetch_usersList,
        fetch_auto_login_register, fetch_logout, fetch_avatar, groups, users, rcAuthToken, rcUserId, subtitle, statusLogin];
}
export default useHomeScreen;