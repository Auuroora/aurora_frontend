/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

class DetailScreen extends Component{
    static navigationOptions = {
      header: null,
    };
    render(){
      return (
        <View style={styles.container}>
          <Text style={styles.textForm}>작가이름</Text>
          <Text style={styles.textForm}>#카페 #감성</Text>
          <Text style={styles.textForm}>$1000</Text>
          <Image source={require('../../image/img.jpg')} style={{height:300, width:300, resizeMode:'cover'}}/>
        </View>
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
  textForm: {
    fontSize: wp('5%'),
  },
})

export default DetailScreen