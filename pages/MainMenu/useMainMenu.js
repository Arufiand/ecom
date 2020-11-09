
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
//This is an example code for Bottom Navigation//
import { useState, useEffect } from 'react';
import { useStore } from '../../App';
import EndPoint from '../../config/endpoint';
import label from '../../config/localLabelStorage';
const useMainMenu = ({route, navigation}) => {

  const authToken = route.params.rcAuthToken;
  const userId = route.params.rcUserId;
  const {paramNavigator} = useStore();
  const [users, setUsers] = useState([]);
  const ep = new EndPoint();

  fetch_avatar = (username) => {
    return `http://172.16.200.56:3000/avatar/${username}?size=50`;
  }

  useEffect(() => {
    fetch_usersList();
  },[paramNavigator.rcUserId])

  fetch_usersList = () => {

    var config = {
      method: 'get',
      url: ep.get_usersList(),
      headers: {
        'X-Auth-Token': paramNavigator.rcAuthToken,
        'X-User-Id': paramNavigator.rcUserId
      }
    };
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data.users, null, 2));
        const start = Date.now();
        if (subscribed == false) {
          try {
            const user = response.data.users.filter(user => user.customFields.user_type == "guru_wali" && user.username != rcUsername).map(user => {
              setUsers(prevArray => [...prevArray, user]);
              const userChat = {
                _id: user._id,
                name: user.name,
                username: user.username
              }
             // let randomId = userChat._id + start;
              //authContext.onSendRocketChat(ep.ws_rocket_stream_room_message(randomId, userChat._id));
              console.log(`response : ${JSON.stringify(user, null, 2)}`);
            })
          } catch (err) {
            console.log(err);
          }
        }
        else if (subscribed == true) {
          console.log(`history has been subscribed!`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return [fetch_avatar, users];
}
export default useMainMenu;