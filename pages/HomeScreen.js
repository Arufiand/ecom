//This is an example code for Bottom Navigation//
import React, {useEffect} from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used
import FlexBox from './FlexBox';

//import Onesignal
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = (props) => {

    /**
 * This useEffect for OneSignal Only
 * app ids on Label Local Storage
*/
    useEffect(() => {

        const onReceived = (notification) => {
            // console.log("Notification received: ", notification);
            dispatchNotif({ type: "NOTIFICATION_RECEIVED", notification });
            setNotifComing(true);
        }

        const onOpened = (openResult) => {
            console.log('Message -> ', JSON.stringify(openResult.notification.payload.body, null, 2));
            console.log('Data -> ', JSON.stringify(openResult.notification.payload.additionalData, null, 2));
            console.log('isActive -> ', JSON.stringify(openResult.notification.isAppInFocus, null, 2));
            console.log('openResult -> ', JSON.stringify(openResult, null, 2));
        }

        const onIds = async (device) => {
            console.log(`Device info: -> ${JSON.stringify(device, null, 2)}`);
            await AsyncStorage.getItem("signal_id").then(async (result) => {
                if (result == null) {
                    // console.log("There is no OneSignal ID");
                    await AsyncStorage.setItem("signal_id", device.userId);
                } else {
                    console.log("Already have OneSignal ID");
                }
            });
        }

        const initOneSignal = () => {
            // console.log("Init OneSignal ID");
            OneSignal.init("14092b00-09d4-48e0-9218-5ec4c3a49c7f");
            // Disable Message Box
            OneSignal.inFocusDisplaying(0);
            OneSignal.addEventListener('received', onReceived);
            OneSignal.addEventListener('opened', onOpened);
            OneSignal.addEventListener('ids', onIds);
        };

        initOneSignal();

        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', onOpened);
            OneSignal.removeEventListener('ids', onIds);
        }
    }, []);

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