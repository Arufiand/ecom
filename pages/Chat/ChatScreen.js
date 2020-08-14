import React from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import useChatScreen from './useChatScreen';


const ChatScreen = ({ route, navigation }) => {
    // const roomId = route.params;
    const [messages, setMessages, onSend, roomId, userId] = useChatScreen({ route });

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: userId,
            }}
            loadEarlier={true}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
export default ChatScreen;