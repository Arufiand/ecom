//This is an example code for Bottom Navigation//
import React,{ useState} from 'react';
//import react in our code.
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, } from 'react-native';
import { ListItem } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import label from '../../config/local_label_storage';
import Colors from '../../config/utils';
//import all the basic component we have used
import useHomeScreen from './useHomeScreen';
import moment from 'moment';

const HomeScreen = ({ route, navigation }) => {

    const oneSignalPushToken = label.onesignal_push_token;
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername, pass, setPass, name, setName, email,
        setEmail, mainId, setMainId, role, setRole, fetch_login, fetch_register, fetch_groupList, fetch_usersList,
        fetch_auto_login_register, fetch_logout, groups, rcAuthToken, rcUserId, subtitle, statusLogin] = useHomeScreen();

    const renderItem = ({ item, index }) => {
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
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>

                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
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
                    <View style={{ width: responsiveWidth(99), padding: 7, borderRadius: 4, backgroundColor: Colors.circle }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.circle}} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { roomId, rcAuthToken, rcUserId }); }}>
                                {item.total == 0 ?
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => fetch_groupList()}>
                                        <Text>Group List</Text>
                                    </TouchableOpacity>
                                    :
                                    <ListItem
                                        title={item.name}
                                        // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                                        subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
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
        <View style={styles.container}>
            <View style={styles.circle}></View>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={Colors.placeHolders}
                // onSubmitEditing= {()=>this.password.focus()}
                onChangeText={text => {
                    setUsername(text);
                }}
                value={username}
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
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_auto_login_register(username, pass, email, name)}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_register(username, pass, email, name, role, mainId)}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch_logout()}>
                    <Text>Log Out?</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data={groups}
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
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: Colors.circle,
        position: 'absolute',
        left: -150,
        top: -20

    },
    input: {
        width: 300,
        borderRadius: 300 / 2,
        backgroundColor: Colors.input,
        padding: 15,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'


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