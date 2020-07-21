import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Style from '../Styling/Style';


const ChatButton = ({title, modeValue, ...rest}) => {
    return (
        <Button
            mode={modeValue}
            {...rest}
            style = {Style.Button} 
            contentStyle = {Style.buttonContainer}
        >
            {title}
        </Button>   
    )
};

export default ChatButton

const styles = StyleSheet.create({})
