import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

import CardComponent from '../../Components/Card'


export default class HomeScreen extends Component{
  render(){
    return (
      //TODO: 무한 스크롤 적용해야함 
      //TODO: Component 로 뽑아내기
      <ScrollView style={styles.container}>
        <View style={{flexDirection:"row"}}>
          <View style={styles.wrapContent}>
            <CardComponent imageSource='1' likes='12'/>
          </View>   
          <View style={styles.wrapContent}>
            <CardComponent imageSource='2' likes='11'/>
          </View>   
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={styles.wrapContent}>
            <CardComponent imageSource='1' likes='22'/>
          </View>   
          <View style={styles.wrapContent}>
            <CardComponent imageSource='2' likes='11'/>
          </View>    
        </View>

      </ScrollView>       
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:'row',
    padding: wp('5%'),
    backgroundColor: 'white',
    
  },
  wrapContent: {
    width: wp('45%'),
    height: wp('80%'),
    paddingBottom: wp('5%'),
        
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "#46c3ad",
  }
})