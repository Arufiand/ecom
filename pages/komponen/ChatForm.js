import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper';
import Style from '../Styling/Style';

const ChatForm = ({labelName, ...rest}) => {
    return (
        <TextInput
            label = {labelName}
            style = {Style.input}
            numberOfLines = {1}
            {...rest}
        />
    )
}

export default ChatForm

const styles = StyleSheet.create({})
