import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import EndPoint from '../../config/endpoint';
import { useStore } from '../../App';

const useChatScreen = ({ route }) => {


    const ep = new EndPoint();

    const roomId = route.params.roomId;
    const usernameRoom = route.params.usernameRoom;
    const authToken = route.params.rcAuthToken;
    const userId = route.params.rcUserId;

    const { authContext, response, chat, dmResponse } = useStore();

    // console.log(`room id : ${roomId}, authToken = ${authToken}, user Id = ${userId}`);
    const [messages, setMessages] = useState([]);
    const [loadHistory, setLoadHistory] = useState(false);

    useEffect(() => {  
         switch (roomId || usernameRoom) {
            case roomId:
                console.log(`isi room ID : ${roomId}`);
                //ws_rc_load_message(roomId);
                get_history_message(roomId);
                break;
            case usernameRoom:
                console.log(`isi username : ${usernameRoom}`);
                ws_rc_create_direct_message(usernameRoom);
                break;
        }
    }, [])

    useEffect(() => {
            let prop = "result"
            if (response.hasOwnProperty(prop)) {
                if (response.result.hasOwnProperty("rid"))
                //console.log(`response = ${response.result.rid}`);
                im_history_chat(response.result.rid);
            }
            else {
                console.log(`Tidak ada key ini`);
            }
            //console.log(`response = ${response.result.rid}`);
            
    }, [response])

    useEffect(() => {
        // console.log(`messages isinya : ${JSON.stringify(chat, null, 2)}`)
        if (chat.msg == "changed" && loadHistory == true) {
            if (chat.fields.args[0].u._id != userId && chat.fields.eventName == roomId) {
                console.log(`ini berapa kali hayoooo`);
                try {
                    //console.log(`id chatter = ${JSON.stringify(chat.fields.args[0].u._id, null, 2)} + room yang di chat = ${JSON.stringify(chat.fields.eventName, null, 2)}`);
                    const newMsg = {
                        _id: chat.fields.args[0]._id,
                        text: chat.fields.args[0].msg,
                        createdAt: chat.fields.args[0].ts.$date,
                        user: {
                            _id: chat.fields.args[0].u._id,
                            name: chat.fields.args[0].u.name,
                            avatar: 'https://placeimg.com/140/140/any',
                        }
                    }
                    setMessages(prevArray => [newMsg, ...prevArray])
                } catch (error) {
                    console.log(error);
                }
            }
        }
        // else if (loadHistory == false) {
        //     try {
        //         //console.log(`ini masuk sini ! dan isi chat.result.messages = ${JSON.stringify(chat.result.messages, null, 2)}`);
        //         for (let msg of chat.result.messages) {
        //             const oldChat = {
        //                 _id: msg._id,
        //                 text: msg.msg,
        //                 createdAt: msg.ts.$date,
        //                 user: {
        //                     _id: msg.u._id,
        //                     name: msg.u.name,
        //                     avatar: 'https://placeimg.com/140/140/any',
        //                 }
        //             }
        //             setMessages(prevArray => [...prevArray, oldChat]);
        //             setLoadHistory(true);
        //         }
        //         /// end looping chat
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }, [chat])

    //#region websocket

    const ws_rc_load_message = useCallback((roomId) => {
        authContext.onSendRocketChat(ep.ws_rocket_load_lastest_history(roomId))
        console.log(`response ${JSON.stringify(chat, null, 2)}`);
    }, []);

    const ws_rc_create_direct_message = useCallback((usernameRoom) => {
        console.log(`isi dmResponse di ws ${JSON.stringify(chat.result.rid, null, 2)}`);
        authContext.onSendRocketChat(ep.ws_create_direct_message(usernameRoom))
        // .then( async (res) => {
        //     console.log(`creating direct room message with result = ${res}`);
        // })
    },[]);

    const im_history_chat = (roomId) => {

        var config = {
            method: 'get',
            url: ep.get_im_history_chat(roomId),
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data, null, 2));
                for (let msg of response.data.messages) {
                    const chat = {
                        _id: msg._id,
                        text: msg.msg,
                        createdAt: msg.ts,
                        user: {
                            _id: msg.u._id,
                            name: msg.u.name,
                            //avatar: 'https://placeimg.com/140/140/any',
                        }
                    }
                    setMessages(prevArray => [...prevArray, chat])
                    setLoadHistory(true);
                }
                // end looping chat
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    //#endregion

    const onSend = useCallback((messages = []) => {
        let message = messages[0].text;
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        let start = Date.now();
        let messageId = roomId + start;

        console.log(`ini isi MessageId : ${messageId}`);
        console.log(`Isi Message : ${message}`);

        authContext.onSendRocketChat(ep.ws_rocket_send_message(roomId, message, messageId));
    }, [])

    //#region Normal REST API
    get_history_message = () => {

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

                // looping untuk chat array
                for (let msg of response.data.messages){
                    const chat = {
                        _id: msg._id,
                        text: msg.msg,
                        createdAt: msg.ts,
                        user: {
                            _id: msg.u._id,
                            name: msg.u.name,
                            avatar: 'https://placeimg.com/140/140/any',
                        }
                    }
                    setMessages(prevArray => [...prevArray, chat])
                    setLoadHistory(true);
                }
                // end looping chat
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //#endregion

    return [messages, setMessages, onSend, roomId, userId];
}

//ujiCoba
export default useChatScreen;
