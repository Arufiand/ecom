//This is an example code for Bottom Navigation//
import React, { useState } from 'react';
//import react in our code.
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import label from '../../config/localLabelStorage';
//import all the basic component we have used
import useHomeScreen from './useHomeScreen';
import moment from 'moment';
import 'moment/locale/id'
import Styles from '../../config/componentStyle'
import Colors from '../../config/utils';


const HomeScreen = ({ route, navigation }) => {

    const oneSignalPushToken = label.onesignal_push_token;
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername, pass, setPass, name, setName, email,
        setEmail, mainId, setMainId, role, setRole, fetch_login, fetch_register, fetch_groupList, fetch_usersList,
        fetch_auto_login_register, fetch_logout, fetch_avatar, groups, users, rcAuthToken, rcUserId, subtitle, statusLogin] = useHomeScreen();

    const renderItemGroups = ({ item, index }) => {
        let roomId = item._id;
        if (statusLogin == false) {
            return (
                <View><Text>Belum Login!</Text></View>
            );
        }
        else if (statusLogin == true) {
            if (item.lastMessage != "") {
                let todayDate = moment(new Date()).format("DD MMM YY")
                //console.log(`todayDate= ${todayDate}`);
                return (

                    <View style={Styles.renderItem}>
                        <TouchableOpacity style={{ backgroundColor: Colors.borderedBox }} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { roomId, rcAuthToken, rcUserId }); }}>
                            <ListItem
                                title={item.name}
                                // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                                subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
                                leftAvatar={{
                                    source: { uri: fetch_avatar(item.name) }
                                }}
                                rightTitle={item.lastMessage ? <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                    <Text style={{ fontSize: 11 }}>
                                        {moment(item.lastMessage.ts).format("DD MMM YY") == todayDate ? moment(item.lastMessage.ts).local().startOf('seconds').fromNow() : moment(item.lastMessage.ts).format("DD MMM YY")}

                                    </Text>
                                </View> : null}
                            />
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    const renderItemUsers = ({ item, index }) => {
        let usernameRoom = item.username;
        //console.log(`roomId = ${roomId}`);
        if (statusLogin == false) {
            return (
                <View><Text>Belum Login!</Text></View>
            );
        }
        else if (statusLogin == true) {
            if (item.lastMessage != "") {
                return (
                    <View style={Styles.renderItem}>
                        
                        <TouchableOpacity style={{ backgroundColor: Colors.borderedBox }} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { usernameRoom, rcAuthToken, rcUserId }); }}>
                            <ListItem
                                title={item.name}
                                // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                                subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
                                leftAvatar={{
                                    source: { uri: fetch_avatar(item.username) }
                                    // title: item.name
                                }}
                                // rightTitle={item.lastMessage.ts == "-" ? null : <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                rightTitle={item.lastMessage ? <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                    <Text style={{ fontSize: 11 }}>
                                        {moment(item.lastMessage.ts).format("DD MMM | H:m")}
                                    </Text>
                                </View> : null}
                            />
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }


    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor={Colors.violet} barStyle="light-content" />
            <View style={Styles.labelContainer}>
                <Text style={Styles.labelHeader}>Login</Text>
            </View>
            <View style={Styles.borderedBox}>
                <TextInput
                    style={Styles.input}
                    placeholder="Username"
                    placeholderTextColor={Colors.placeHolders}
                    // onSubmitEditing= {()=>this.password.focus()}
                    onChangeText={text => {
                        setUsername(text);
                    }}
                    value={username}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    placeholderTextColor={Colors.placeHolders}
                    secureTextEntry={true}
                    // onSubmitEditing= {()=>this.password.focus()}
                    onChangeText={text => {
                        setPass(text);
                    }}
                    value={pass}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={() => fetch_auto_login_register(username, pass, email, name)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={() => fetch_register(username, pass, email, name, role, mainId)}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 400 }}>
                {/* <FlatList
                        keyExtractor={(item, index) => item._id}
                        data={users}
                        renderItem={renderItemUsers}
                    /> */}
                {/* <ScrollView nestedScrollEnabled = {true}> */}
                {/* <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={groups}
                    renderItem={renderItemGroups}
                /> */}
                {/* </ScrollView> */}
            </View>
        </View>

    )
}

export default HomeScreen

const CardMenu = ({ title }) => {
    return (
        <View style={Styles.CardMenu}>
            <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.buttons }}>{title}</Text>
            </View>
        </View>
    );
}

