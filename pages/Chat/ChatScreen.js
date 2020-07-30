import React, {useEffect, useState, useCallback} from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView,Text, FlatList, View, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import useChatScreen from './useChatScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';




const ChatScreen = ({route, navigation}) => {
    // const roomId = route.params;
    const [messages, setMessages, roomId, fetch_channelList] = useChatScreen({route});
    console.log(`${roomId}`);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
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