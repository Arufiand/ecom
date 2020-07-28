import React from 'react'
import { View, Text } from 'react-native';
import EndPoint from '../../config/endpoint'

const useChatScreen = () => {

    const ep = new EndPoint();

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
    return[];
}

export default useChatScreen;
