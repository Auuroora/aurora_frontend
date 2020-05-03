/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Profile from '../../Components/Profile'
import Grid from '../../Components/Grid'

class MypageScreen extends Component{
  
  render(){
    
    const images = {
      '1': require('../../image/img.jpg'),
      '2': require('../../image/img2.jpg'),
      '3': require('../../image/img.jpg'),
      '4': require('../../image/img.jpg'),
      '5': require('../../image/img.jpg'),
      '6': require('../../image/img2.jpg'),
      '7': require('../../image/img.jpg'),
    }
    return (   
      <View style={styles.my_container}>
        <View style={styles.profile_container}>
          <Profile></Profile>
        </View>
        <View style={styles.card_container}>
          <Grid numColumns ={3} item = {images}></Grid>
        </View>
      </View>
    )
  }
}
//props로 col넘버 넘겨주기
//child는?

const styles = StyleSheet.create({
  my_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile_container:{
    flex: 1,
  },
  card_container:{
    flex: 3,
  },
})

export default MypageScreen