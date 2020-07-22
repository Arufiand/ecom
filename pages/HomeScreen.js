//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used
import FlexBox from './FlexBox';

const HomeScreen = (props) => {
    return (
       <View>
           <View style={styles.circle}></View>
           <ScrollView>
                <Text style={{ marginTop: 50, fontSize: 25, alignItems:'center' }}>Home!</Text>
                <View
                    style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate('Settings')}>
                        <Text>Go to settng Tab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate('Details')}>
                        <Text>Open Details Screen</Text>
                    </TouchableOpacity>
                </View>
           </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        marginTop: 20,
        borderRadius: 20,
        justifyContent : 'center'
    },
    container: {
        flex: 1,
        width : '100%',
        height: '30%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius : 500/2,
        backgroundColor: '#7F00FF',
        position: 'absolute',
        left: -150,
        top: -20

    }
});