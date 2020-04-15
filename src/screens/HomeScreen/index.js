import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

import CardComponent from '../../component/Card'
import { TouchableHighlight } from 'react-native-gesture-handler'


export default class HomeScreen extends Component{
  _navigate(){
    this.props.navigation.navigate('DetailScreen')
  }
  render(){
    return (
      //무한 스크롤 적용해야함 
      <ScrollView style={styles.container}>
        <View style={{flexDirection:"row"}}>
          <View style={styles.wrapContent}>
            <TouchableOpacity onPress={this._navigate.bind(this)}>
              <CardComponent imageSource='1' likes='12'/>
            </TouchableOpacity>  
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