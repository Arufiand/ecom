import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Style from './Styling/Style';

const CalculatorInput = (props) => {
    return (
        <TouchableHighlight 
            style={Style.inputButton}
            underlayColor="#193441"
            onPress = {props.onPress}
        >
            <Text style={Style.inputButtonText}>{props.value}</Text>
        </TouchableHighlight>
    )
}

export default CalculatorInput
