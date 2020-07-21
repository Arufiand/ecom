//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used
import FlexBox from './FlexBox';
import Position from './Position';

const DetailsScreen = () => {
    return (
        <View>
            <ScrollView>
                <FlexBox />
                    <Position /> 
                <FlexBox />
            </ScrollView>
        </View>
    );
}

export default DetailsScreen

const styles = StyleSheet.create({})
