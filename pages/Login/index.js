import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';



const Login = () => {
  const [User, setUser] = React.useState('');
  const [Pass, setPass] = React.useState('');
  return (
    <View 
    style = {{
      padding: 15, 
      backgroundColor : '#F2F2F2',
      width : 350,
      borderRadius : 8,
      margin : 20,
      }}>
    <Text 
    style = {{
      fontSize : 28,
      fontWeight : 'bold',
      color : 'black',
      paddingBottom : 12
    }}>Login</Text>
    <Text 
    style = {VarLogin.text}> Username</Text>
    <TextInput 
    style ={{paddingVertical : 6}} 
    placeholder = "isikan Username" 
    placeholderTextColor = "black"
    // onSubmitEditing= {()=>this.password.focus()}
    onChangeText={text => {
      setUser(text);
      console.log(`isi user ${text}`);      
    }}
    value = {User}
    
    />
    <Text 
      style = {VarLogin.text}> password</Text>
    <TextInput secureTextEntry={true} 
    style ={{paddingVertical : 6}} 
    placeholder ="isikan Password" 
    placeholderTextColor = "black" 
    onChangeText={text => {
      setPass(text);
      console.log(`isi user ${text}`);      
    }}
    value= {Pass}
    
    />
    <TouchableOpacity 
        style = {{
            backgroundColor: '#6FCF97', paddingVertical : 6, borderRadius : 25, marginTop : 25
        }}>
          <Text 
          style = 
            {{
                fontSize : 18, 
                fontWeight : '300', 
                color : 'white', 
                textAlign : 'center'
            }}>
                Login Mbut
          </Text>
      </TouchableOpacity>
    </View>
  );
}

const VarLogin = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }

});
export default Login;