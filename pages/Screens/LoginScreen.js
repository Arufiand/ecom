import React, {useState} from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import ChatForm from './../komponen/ChatForm';
import ChatButton from './../komponen/ChatButton';
import Style from '../Styling/Style';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={Style.loginContainer}>
            <Title style = {Style.titleText}> Welcome to Ecom App!</Title>
            <ChatForm 
                labelName = 'Email'
                value = {email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <ChatForm 
                labelName = 'Password'
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
             />
             <ChatButton
                title='Login'
                modeValue='contained'
                labelStyle={Style.loginButtonLabel}
             />      
             <ChatButton
                title='New user? Join here'
                modeValue='text'
                uppercase ={false}
                labelStyle={Style.navButtonText}
                onPress={() => navigation.navigate('Signup')}
             />      
        </View>
    );
}

export default LoginScreen
