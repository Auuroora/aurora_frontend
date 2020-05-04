import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

import CardComponent from '../../Components/Card'
import SearchComponent from '../../Components/Search'

import { Examples } from '@shoutem/ui'

class HomeScreen extends Component{
  render(){
    return (
      //TODO: 무한 스크롤 적용해야함 
      //TODO: Component 로 뽑아내기
      <View style={styles.container}>
        <Examples />
        <SearchComponent></SearchComponent>
        <ScrollView>
          <View style={{flexDirection:"row"}}>
            <View style={styles.wrapContent}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen', {
                imgId:'1'
              })}>
                <CardComponent imageSource='1' likes='12'/>
              </TouchableOpacity>  
            </View> 
            <View style={styles.wrapContent}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen', {
                imgId:'2'
              })}>
                <CardComponent imageSource='2' likes='11'/>
              </TouchableOpacity> 
            </View>   
          </View>
          <View style={{flexDirection:"row"}}>
            <View style={styles.wrapContent}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen', {
                imgId:'1'
              })}>
                <CardComponent imageSource='1' likes='12'/>
              </TouchableOpacity>  
            </View> 
            <View style={styles.wrapContent}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen', {
                imgId:'2'
              })}>
                <CardComponent imageSource='2' likes='11'/>
              </TouchableOpacity> 
            </View>   
          </View>
        </ScrollView>     
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default HomeScreen