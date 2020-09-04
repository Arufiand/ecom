//This is an example code for Bottom Navigation//
import React,{ useState} from 'react';
//import react in our code.
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal,ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import label from '../../config/local_label_storage';
//import all the basic component we have used
import useHomeScreen from './useHomeScreen';
import moment from 'moment';
import Styles from '../Styling/chatStyle'
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
              <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={Styles.centeredView}>
                            <View style={Styles.modalView}>
                                <Text style={Styles.modalText}>Hello World!</Text>
                                <TouchableOpacity
                                    style={{ ...Styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                <Text style={Styles.textStyle}>Hide Modal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
              </View>  
            );
        }
        else if (statusLogin == true) {
            if (item.lastMessage != "") {
                return (
                    <View style={Styles.renderItem}>
                        <TouchableOpacity style={{ backgroundColor: Colors.circle}} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { roomId, rcAuthToken, rcUserId }); }}>
                                {item.total == 0 ?
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={() => fetch_groupList()}>
                                        <Text>Group List</Text>
                                    </TouchableOpacity>
                                    :
                                    <ListItem
                                        title={item.name}
                                        // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                                        subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
                                        // leftAvatar={{
                                        //     source: fetch_avatar(item.fname) && { uri: fetch_avatar(item.fname) },
                                        //   // title: item.name
                                        // }}
                                        // rightTitle={item.lastMessage.ts == "-" ? null : <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                        rightTitle={item.lastMessage ? <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                            <Text style={{ fontSize: 11 }}>
                                                {moment(item.lastMessage.ts).format("DD MMM | H:m")}
                                            </Text>
                                        </View> : null}
                                     />
                                }
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    const renderItemUsers = ({ item, index }) => {
        let roomId = item._id;
        if (statusLogin == false) {
            return (
              <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={Styles.centeredView}>
                            <View style={Styles.modalView}>
                                <Text style={Styles.modalText}>Hello World!</Text>

                                <TouchableOpacity
                                    style={{ ...Styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={Styles.textStyle}>Hide Modal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
              </View>  
            );
        }
        else if (statusLogin == true) {
            if (item.lastMessage != "") {
                return (
                    <View style={Styles.renderItem}>
                        <TouchableOpacity style={{ backgroundColor: Colors.circle}} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { roomId, rcAuthToken, rcUserId }); }}>
                                {item.total == 0 ?
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={() => fetch_usersList()}>
                                        <Text>Group List</Text>
                                    </TouchableOpacity>
                                    :
                                    
                                    <ListItem
                                        title={item.name}
                                        // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                                        subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
                                        leftAvatar={{
                                          source: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.biography.com%2Factor%2Fmatt-damon&psig=AOvVaw3jStgwmgfxmBt6U82RkzF-&ust=1599290234999000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjnmsb6zusCFQAAAAAdAAAAABAD",
                                          // title: item.name
                                        }}
                                        // rightTitle={item.lastMessage.ts == "-" ? null : <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                        rightTitle={item.lastMessage ? <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                                            <Text style={{ fontSize: 11 }}>
                                                {moment(item.lastMessage.ts).format("DD MMM | H:m")}
                                            </Text>
                                        </View> : null}
                                     />
                                }
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }
    

    return (
        <View style={Styles.container}>
            <View style={Styles.circle}></View>
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
                <TouchableOpacity
                    style={Styles.button}
                    onPress={() => fetch_logout()}>
                    <Text>Log Out?</Text>
                </TouchableOpacity>
            </View>
                <View style={{ height : 200}}>
                    <Text style={Styles.text}>Grup Kelas</Text>
                    <ScrollView nestedScrollEnabled = {true}>
                        <FlatList
                            keyExtractor={(item, index) => item._id}
                            data={groups}
                            renderItem={renderItemGroups}
                        />
                    </ScrollView>
                </View>
                <View style={{ height : 200}}>
                    <Text style={Styles.text}>Contact</Text>
                    <ScrollView nestedScrollEnabled = {true}>
                        <FlatList
                            keyExtractor={(item, index) => item._id}
                            data={users}
                            renderItem={renderItemUsers}
                        />
                    </ScrollView>
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

