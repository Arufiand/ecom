//This is an example code for Bottom Navigation//
import React, { useState } from 'react';
//import react in our code.
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView, DatePickerAndroid, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import label from '../../config/localLabelStorage';
//import all the basic component we have used
import useMainMenu from './useMainMenu';
import moment from 'moment';
import 'moment/locale/id'
import Styles from '../../config/componentStyle'
import Colors from '../../config/utils';
import { useStore } from '../../App';

const MainMenu = ({ route, navigation }) => {

    const oneSignalPushToken = label.onesignal_push_token;
    const [modalVisible, setModalVisible] = useState(false);
    const [fetch_avatar] = useMainMenu({ route });
    const { authContext, response, chat, setParamNavigator, paramNavigator } = useStore();

    const Story = props => {
      return (
        <View style={{ alignItems: "center", marginRight: 20 }}>
          <Image
            source={{ uri: fetch_avatar(props.gambar) }}
            style={Styles.pictureMenu}
          />

          <Text style={{ width: 60, textAlign: "center" }}>
            {props.Nama}
          </Text>
        </View>
      );
    }

    return (
        <View>
        <View style={Styles.container}>
            <View style={{ flexDirection: 'row'}}>
                <View style={{ flex: 5 }}>
                    <View style={Styles.labelContainer}>
                        <Text style={Styles.labelHeader}>Main Menu</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={Styles.labelContainer}>
                    <Image
                        style={Styles.pictureMenu}
                        source= {{uri: fetch_avatar('admin')}}           
                    />
                  </View>
                </View>
            </View>
                <View style={Styles.borderedBox}>
                    <View style={Styles.borderedBoxContainer}>
                      <Text style={Styles.labelBody}>Contact</Text>
                      <ScrollView horizontal>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                        <Story Nama="admin" gambar="admin"/>
                      </ScrollView>
                    </View>
                </View>
            </View>
        </View>
        
    )
}

export default MainMenu

const CardMenu = ({ title }) => {
    return (
        <View style={Styles.CardMenu}>
            <View style={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.buttons }}>{title}</Text>
            </View>
        </View>
    );
}

