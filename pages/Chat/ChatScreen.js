import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import useChatScreen from './useChatScreen';
import colors from '../../config/utils';



const ChatScreen = ({ route, navigation }) => {
    // const roomId = route.params;
    const [messages, setMessages, onSend, roomId, userId] = useChatScreen({ route });
    const renderBubble = (props) => {
        const sizeFont = 13;
        return <Bubble
            textStyle={{
                right: {
                    color: colors.default_text,
                    fontSize: sizeFont
                },
                left: {
                    color: colors.default_text,
                    fontSize: sizeFont
                }
            }}
            wrapperStyle={{
                right: {
                    backgroundColor: colors.buttons,
                },
                left: {
                    backgroundColor: colors.input,
                }
            }} {...props} />
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: userId,
            }}
            loadEarlier={true}
            renderBubble={renderBubble}
            showAvatarForEveryMessage={true}

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