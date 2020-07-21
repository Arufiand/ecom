import React from 'react'
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import Style from './Styling/Style';
import CalculatorInput from './CalculatorInput';

const inputButtons = [
    [1,2,3,'/'],
    [4,5,6,'*'],
    [7,8,9,'-'],
    [0,'.','=','+'],
];

const CalculatorScreen = () => {
   
    const _onButtonPressed = (input) =>{
        alert(input);
    }

    const _renderInputButtons = () => {
        let views = [];

        for (var r = 0; r < inputButtons.length; r++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <CalculatorInput 
                        value={input}
                        onPress={_onButtonPressed.bind(this, input)}
                        key={r + "-" + i} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }
   
    return (
        <View style={Style.rootContainer}>
            <View style={Style.displayContainer}></View>
            <View style={Style.inputContainer}>
                {_renderInputButtons()}
            </View>
        </View>
    )
    


}

export default CalculatorScreen

const styles = StyleSheet.create({})
