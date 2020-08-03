import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import EndPoint from '../../config/endpoint';
import label from '../../config/local_label_storage'
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';

const useChatScreen = ({route}) => {

    const ep = new EndPoint();

    const roomId = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        get_history_message();
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: label.rc_user_name,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    get_history_message = async () => {

        const authToken = await AsyncStorage.getItem(label.rc_user_auth_token)
        const userId = await AsyncStorage.getItem(label.rc_user_id)
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
    

    return[messages, setMessages,onSend, roomId, get_history_message ];
}

export default useChatScreen;
