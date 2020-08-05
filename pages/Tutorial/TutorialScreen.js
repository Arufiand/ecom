import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Endpoint from '../../config/endpoint';

const TutorialScreen =({route, navigation})=> {

    const ep = new Endpoint();
    
    useEffect(() => {
        const ws = new WebSocket(ep.ws_connection())
        console.log(`ws = ${ws}`);
        ws.onopen = () => {
            console.log(`socket connected!`);
        }
        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            console.log(message);
            //dibuat IF!!!
            // ws.send(ep.socket_connect_rocketchat())
        }

    }, []);
   

    
    return (
        <View>
            <Text>hai</Text>
        </View>
    )
}

export default TutorialScreen;
