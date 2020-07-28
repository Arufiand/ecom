import React from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView,Text, FlatList, View, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import useChatScreen from './useChatScreen';


const ChatScreen = () => {
    return (
    <View>
    <FlatList
        data={[
            { key: 'Devin' },
            { key: 'Dan' },
            { key: 'Dominic' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
    </View>
    );

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