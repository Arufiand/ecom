import React, {useState} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';



const Login = ({route, navigation}) => {
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  return (
    <View style = {VarLogin.container}>
        <Text style = {VarLogin.textLabel}>Login</Text>
        <Text style = {VarLogin.text}> Username</Text>
        <TextInput style ={{paddingVertical : 6}} placeholder = "isikan Username" placeholderTextColor = "black" // onSubmitEditing= {()=>this.password.focus()}
              onChangeText={text => {setUser(text);}} value = {User}/>

        <Text style = {VarLogin.text}> password</Text>
        <TextInput secureTextEntry={true} style ={{paddingVertical : 6}} placeholder ="isikan Password" placeholderTextColor = "black" 
              onChangeText={text => {setPass(text); }}value= {Pass}/>
         <TouchableOpacity style = {VarLogin.Button}>
            <Text style = {VarLogin.ButtonText}>Login Mbut</Text>
         </TouchableOpacity>
    </View>
  );
}

const VarLogin = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
  container: {
    padding: 15,
    backgroundColor: '#F2F2F2',
    width: 350,
    borderRadius: 8,
    margin: 20,
  },
  textLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 12
    },
  Button: {
    backgroundColor: '#6FCF97', paddingVertical: 6, borderRadius: 25, marginTop: 25
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  }

});
export default Login;