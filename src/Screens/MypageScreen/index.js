/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import Profile from '../../Components/Profile'
import Grid from '../../Components/Grid'

class MypageScreen extends Component{
  render(){
    
    const images = [
      {
        key: "1",
        image : "'../image/img.jpg'"
      },
      {
        key: "2",
        image : "'../image/img.jpg'"
      },
      {
        key: "3",
        image : "'../image/img.jpg'"
      },
      {
        key: "4",
        image : "'../image/img.jpg'"
      },
      {
        key: "5",
        image : "'../image/img.jpg'"
      },
      {
        key: "6",
        image : "'../image/img.jpg'"
      },
      {
        key: "7",
        image : "'../image/img2.jpg'"
      },
      {
        key: "8",
        image : "'../image/img.jpg'"
      },
      {
        key: "9",
        image : "'../image/img.jpg'"
      },
      {
        key: "10",
        image : "'../image/img2.jpg'"
      },
      {
        key: "11",
        image : "'../image/img.jpg'"
      },
      {
        key: "12",
        image : "'../image/img.jpg'"
      }
    ]

    return (   
      <View style={styles.my_container}>
        <View style={styles.profile_container}>
          <Profile navigation={this.props.navigation}></Profile>
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