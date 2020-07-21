import React, { useState } from 'react';
import { View } from 'react-native';
import { Title, IconButtton } from 'react-native-paper';
import ChatForm from './../komponen/ChatForm';
import ChatButton from './../komponen/ChatButton';
import Style from '../Styling/Style';


const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={Style.loginContainer}>
            <Title style={Style.titleText}> Register to Chat</Title>
            <ChatForm
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <ChatForm
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <ChatButton
                title='Signup'
                modeValue='contained'
                labelStyle={Style.loginButtonLabel}
            />
            <IconButtton 
                icon='keyboard-backspace'
                size={30}
                style={Style.navButton}
                color='#6646ee'
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default SignupScreen
