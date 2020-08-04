//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../config/utils';
//import all the basic component we have used
import useHomeScreen from './useHomeScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import label from '../../config/local_label_storage';

const HomeScreen = ({ route, navigation }) => {

    const oneSignalPushToken = label.onesignal_push_token;
    // const rcAuthToken = label.rc_user_auth_token;
    // const rcUserId = label.rc_user_id;

    // console.log(`RC AuthToken : ${rcAuthToken}`);
    // console.log(`RC UserId : ${rcUserId}`);

    const [username, setUsername, pass, setPass, name, setName, email,
        setEmail, fetch_login, fetch_register, fetch_groupList, groups, rcAuthToken, rcUserId] = useHomeScreen();

    const renderItem = ({ item, index }) => {
        let roomId = item._id;
        return (
            
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate('Chat', {roomId, rcAuthToken,rcUserId}); }}>  
                <View style={{ width: responsiveWidth(99), paddingLeft: 5, paddingTop: 5, paddingRight: 5, borderRadius: 4, backgroundColor: Colors.cardMenu }}>
                    {item.count != 0 ? 
                    <ListItem
                        title={item.name}
                        subtitle={item.lastMessage.msg ? item.lastMessage.msg : "Belum Ada Pesan" } 
                    /> : 
                    <ListItem
                                title={"Tidak Ada Data"}
                                subtitle={"Tidak Ada Data"}
                        />
                    }
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style = {styles.circle}></View>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={Colors.placeHolders}
                    // onSubmitEditing= {()=>this.password.focus()}
                    onChangeText={text => {
                        setEmail(text);
                    }}
                    value={email}
                />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.placeHolders}
                secureTextEntry={true}
                // onSubmitEditing= {()=>this.password.focus()}
                onChangeText={text => {
                    setPass(text);
                }}
                value={pass}
            />
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_login(email, pass, oneSignalPushToken)}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_register(username, pass, email, name)}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_groupList()}>
                    <Text>Group List</Text>
                </TouchableOpacity>
                </View>
                <View style= {{flexDirection: 'row'}}>
                 <FlatList
                    keyExtractor={(item, index) => item._id }
                    data={ groups }
                    renderItem={renderItem}
                   />
                </View>
        </View>
        
    )
}

export default HomeScreen

const CardMenu = ({ title }) => {
    return (
        <View style={{
            backgroundColor: Colors.cardMenu,
            width: responsiveWidth(5),
            height: responsiveWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginTop: 10,
            marginRight: -5
        }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.buttons }}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: Colors.buttons,
        padding: 10,
        width: 100,
        margin: 10,
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
        backgroundColor: Colors.circle,
        position: 'absolute',
        left: -150,
        top: -20

    },
    input: {
        width: 300,
        borderRadius: 300/2,
        backgroundColor: Colors.input,
        padding: 15,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign : 'center'


    },
    container: {
        flex: 1,
        backgroundColor: Colors.container,
        alignItems: 'center',
        justifyContent: 'center',  
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});