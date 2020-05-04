/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import Profile from './Profile'
import Grid from './Grid


class MypageScreen extends Component{
  render(){

    return (   
      <View style={styles.my_container}>
        <View style={styles.profile_container}>
          <Profile navigation={this.props.navigation}></Profile>
        </View>
        <View style={styles.card_container}>
          <Grid numColumns ={3} ></Grid>
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