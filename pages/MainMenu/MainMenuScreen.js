//This is an example code for Bottom Navigation//
import React, { useState } from 'react';
//import react in our code.
import { FlatList, SafeAreaView, Text, TextInput,  View,  ScrollView,  Image, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import label from '../../config/localLabelStorage';
//import all the basic component we have used
import useMainMenu from './useMainMenu';
import moment from 'moment';
import 'moment/locale/id'
import Styles from '../../config/componentStyle'
import Colors from '../../config/utils';

const MainMenu = ({ route, navigation }) => {

    // const oneSignalPushToken = label.onesignal_push_token;
    // const [modalVisible, setModalVisible] = useState(false);
    const [fetch_avatar, users, groups] = useMainMenu({ route });

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
                  <TouchableOpacity style={{ backgroundColor: Colors.violet}} activeOpacity={0.5} onPress={() => { navigation.navigate('Chat', { roomId, rcAuthToken, rcUserId }); }}>
                    <ListItem
                        title={item.name}
                        // subtitle={!!selected.get(item._id) ? item.lastMessage.msg : subtitle}
                        subtitle={item.lastMessage ? item.lastMessage.msg : "Belum ada pesan!"}
                        leftAvatar={{
                            source: { uri: fetch_avatar(item.name) }
                        }}
                        rightTitle={item.lastMessage ? <View style={{ marginTop: item.count_chat == 0 ? 0 : -10, marginRight: -5 }}>
                            <Text style={{ fontSize: 11 }}>     
                                {moment(item.lastMessage.ts).format("DD MMM YY") == todayDate ? moment(item.lastMessage.ts).local().startOf('seconds').fromNow() : moment(item.lastMessage.ts).format("DD MMM YY") }
                            </Text>
                        </View> : null}
                      />
                  </TouchableOpacity>
                </View>
              );
          }
      }
  }

    const Story = props => {
      return (
        <View>
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
      <View style={Styles.page}>
        <StatusBar backgroundColor={Colors.violet} barStyle="light-content" />
        <View style={{ flexDirection: 'row',position : 'absolute'}}>
            <View style={{ flex: 4 }}>
                  <Text style={Styles.mainLabelHeader}>Main Menu</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    style={Styles.displayPictureIcon}
                    source= {{uri: fetch_avatar('admin')}}           
                />
            </View>
        </View>
        <SafeAreaView>
          <ScrollView>
            <View style={Styles.firstCard}>
              <Text style={Styles.cardLabelHeader}>Contact</Text>
                <ScrollView horizontal={true} style={Styles.scrollView}>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                    <Story Nama="admin" gambar="admin"/>
                </ScrollView>
                <View style={Styles.secondCard}>
                  <Text style={Styles.cardLabelHeader}>DEF</Text>
                  <ScrollView style={Styles.scrollView}>
                    {/* <FlatList
                      keyExtractor={(item, index) => item.id}
                      data={groups}
                      renderItem={renderItemGroups}
                    /> */}
                  </ScrollView>
                </View>
            </View>
        </ScrollView> 
      </SafeAreaView>
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

