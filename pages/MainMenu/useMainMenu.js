
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

  fetch_avatar = (username) => {
    return `http://172.16.200.56:3000/avatar/${username}?size=50`;
  }

  return [fetch_avatar];
}
export default useMainMenu;