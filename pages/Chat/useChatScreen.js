import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import EndPoint from '../../config/endpoint';

const useChatScreen = ({route}) => {

    const ep = new EndPoint();

    const roomId = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    fetch_channelList = () =>{

        let axiosConfig = {
            headers: {
                'X-Auth-Token': res.data.data.authToken,
                'Content-Type': 'application/json',
                'X-User-Id': res.data.data.userId,
            }
        };
        axios.post(ep.post_channelList(), axiosConfig).then(async res => {
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

    return[messages, setMessages, roomId, fetch_channelList ];
}

export default useChatScreen;
