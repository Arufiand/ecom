import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
// import useTutorial from './UseTutorial';
import useTutorial from './useTutorial';


const TutorialScreen =({route, navigation})=> {
    const [ws_open, ws_onMessage, ws_close]= useTutorial({route})

    useEffect(() => {

        ws_open()
        try {
            ws_onMessage()
        }
        catch (error) {
            ws_close()
        }
    }, []); 
   
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default TutorialScreen;
