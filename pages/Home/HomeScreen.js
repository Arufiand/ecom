//This is an example code for Bottom Navigation//
import React, {useEffect, useState} from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList} from 'react-native';
//import all the basic component we have used
import useHomeScreen from './useHomeScreen';
import { ListItem} from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../../config/utils'

const HomeScreen = ({ route, navigation }) => {

// const[username, setUsername] = useState('admin');
// const[pass, setPass] = useState('adminadmin');


    const [username, setUsername, pass, setPass, name, setName, email,
        setEmail, pushToken, setPushToken, fetch_login, fetch_register,
        fetch_channelList, fetch_groupList, channel, groups] = useHomeScreen();

//onPress={() => { showChatObrolan(index); }}

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {fetch_groupHistory(item._id); }}>  
                <View style={{ width: responsiveWidth(99), paddingLeft: 5, paddingTop: 5, paddingRight: 5, borderRadius: 4, backgroundColor: Colors.cardMenu }}>
                    {item.count != 0 ? <ListItem
                        title={item.name}
                        subtitle={item.ts}
                        rightSubtitle={item.msg == 0 ? null : <CardMenu title={item.msg} />}
                    // rightSubtitle={<CardMenu title={item.count_chat} />}
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
                    onPress={() => fetch_login(email, pass, pushToken)}>
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
                    <Text>Channel List</Text>
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