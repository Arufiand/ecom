import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import EndPoint from '../../config/endpoint';
import { useStore } from '../../App';

const useChatScreen = ({ route }) => {


    const ep = new EndPoint();

    const roomId = route.params.roomId;
    const authToken = route.params.rcAuthToken;
    const userId = route.params.rcUserId;

    const { authContext, response, chat, card } = useStore();

    // console.log(`room id : ${roomId}, authToken = ${authToken}, user Id = ${userId}`);
    const [messages, setMessages] = useState([]);
    const [loadHistory, setLoadHistory] = useState(false);

    useEffect(() => {
        //get_history_message();
        ws_rc_load_message(roomId);
    }, [])

    useEffect(() => {
        console.log(`messages isinya : ${JSON.stringify(chat,null,2)}`)
        if (chat.msg == "changed" && loadHistory == true){
            if (chat.fields.args[0].u._id != userId && chat.fields.eventName == roomId) {
                try {
                    console.log(`id chatter = ${JSON.stringify(chat.fields.args[0].u._id, null, 2)} + room yang di chat = ${JSON.stringify(chat.fields.eventName, null, 2)}`);
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
                    setMessages(prevArray => [newMsg, ...prevArray ])
                } catch (error) {
                    console.log(error);
                }
            }
        }
        else if (loadHistory == false) {
            try {
                for (let msg of chat.result.messages) {
                    const chat = {
                        _id: msg._id,
                        text: msg.msg,
                        createdAt: msg.ts.$date,
                        user: {
                            _id: msg.u._id,
                            name: msg.u.name,
                            avatar: 'https://placeimg.com/140/140/any',
                        }
                    }
                    setMessages(prevArray => [...prevArray, chat]);
                    setLoadHistory(true);
                }
                // end looping chat
            } catch (error) {
                console.log(error);
            }
        }
    }, [chat])



    //#region websocket

    const ws_rc_load_message = useCallback(() => {
        authContext.onSendRocketChat(ep.ws_rocket_load_lastest_history(roomId))
            console.log(`response ${JSON.stringify(chat, null, 2)}`);
             
    }, [])


    //#endregion
    
    const onSend = useCallback( (messages = []) => {
        let message = messages[0].text;
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        let start = Date.now();
        let messageId = roomId + start;

        console.log(`ini isi MessageId : ${messageId}`);
        console.log(`Isi Message : ${message}`);

        authContext.onSendRocketChat(ep.ws_rocket_send_message(roomId, message, messageId));
        
        //#region REST API send Chat Message
        // console.log(JSON.stringify(messages, null, 2));
        // console.log(JSON.stringify(messages[0].text, null, 2));
        //     var data = JSON.stringify({ "message": { "rid": roomId, "msg": messages[0].text } });

        //     var config = {
        //         method: 'post',
        //         url: ep.post_message(),
        //         headers: {
        //             'X-Auth-Token': authToken,
        //             'X-User-Id': userId,
        //             'Content-Type': 'application/json'
        //         },
        //         data: data
        //     };

        //     axios(config)
        //         .then(function (response) {
        //             console.log(JSON.stringify(response.data, null ,2));
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
            //#endregion
    }, [])

    //#region Normal REST API
    // get_history_message = () => {

    //     var data = '';

    //     var config = {
    //         method: 'get',
    //         url: ep.get_historyChat(roomId),
    //         headers: {
    //             'X-Auth-Token': authToken,
    //             'X-User-Id': userId
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {

    //             // looping untuk chat array
    //             for (let msg of response.data.messages){
    //                 const chat = {
    //                     _id: msg._id,
    //                     text: msg.msg,
    //                     createdAt: msg.ts,
    //                     user: {
    //                         _id: msg.u._id,
    //                         name: msg.u.name,
    //                         avatar: 'https://placeimg.com/140/140/any',
    //                     }
    //                 }
    //                 setMessages(prevArray => [...prevArray, chat])
    //             }
    //             // end looping chat
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    //#endregion

    return [messages, setMessages, onSend, roomId, userId];
}

//ujiCoba
export default useChatScreen;
