import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import useTutorial from './useTutorial';


const TutorialScreen = ({ route, navigation }) => {
    const [a, ws_rc_login_token] = useTutorial({ route });

    useEffect(() => {
        
        // ws_rc_login_token();
        
        // return () => {
        //     ws_rc_login_token();
        // }
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={ws_rc_login_token}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TutorialScreen;
