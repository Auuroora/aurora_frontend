/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import ProfileTab from '../../Components/ProfileTab'
class MypageScreen extends Component{
  render(){
    return (        
      <ProfileTab></ProfileTab>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MypageScreen