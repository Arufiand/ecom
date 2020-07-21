import React from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView,Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';


export default function ChatScreen() {
    
    if (Platform.OS === 'android'){
        return (
            <SafeAreaView>
                <Text>Hai Android</Text>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>

                </KeyboardAvoidingView>
            </SafeAreaView>
            
        )
    }
    return (
        <SafeAreaView style={{flex:1}}><Text>Halo</Text></SafeAreaView>
    )
}