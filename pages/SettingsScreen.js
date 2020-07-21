//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used

const SettingsScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginTop: 50, fontSize: 25 }}>Setting!</Text>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Home')}>
                    <Text>Go to Home Tab</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Details')}>
                    <Text>Open Detail Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Calculator')}>
                    <Text>Open Calculator Screen</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
});





