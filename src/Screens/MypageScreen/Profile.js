import React, { Component } from 'react'
import { 
  View,
  StyleSheet,

} from 'react-native'

import {
  Screen,
  NavigationBar,
  ListView,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  Tile, 
  Subtitle,
  Title,
  Card,
  Caption,
  Divider,
  GridRow
} from '@shoutem/ui'

import Icon from 'react-native-vector-icons/Ionicons'

class ProfileTab extends Component{
  onClickSetting = async () => {
    this.props.navigation.navigate('Settingstack')
  }
  render(){
    return (
      <Screen>
        <NavigationBar style={{flexDirection:'row', paddingTop:10}}
          centerComponent={<Title>TITLE</Title>}
        />
        <Screen style={{flexDirection:'row', paddingTop:30}}>
          <Screen style={{flex:1, alignItems:'center'}}>
            <Image source={{uri: 'http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg'}}
              style={{width:75, height:75, borderRadius:37.5}}/>
          </Screen>
          <Screen style={{flex:3}}>
            <Screen style={{flexDirection:'row', justifyContent:'space-around'}}>
              <Screen style={{alignItems:'center'}}>
                <Text>167</Text>
                <Text style={{fontSize:10, color:'gray'}}>posts</Text>
              </Screen>
              <Screen style={{alignItems:'center'}}>
                <Text>346</Text>
                <Text style={{fontSize:10, color:'gray'}}>follower</Text>
              </Screen>
              <Screen style={{alignItems:'center'}}>
                <Text>192</Text>
                <Text style={{fontSize:10, color:'gray'}}>following</Text>
              </Screen>
            </Screen>
            <Screen style={{flexDirection:'row'}}>
              <Button bordered dark onPress={() =>{alert("프로필 수정")}}
                style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                <Text>Edit Profile</Text>
              </Button>
              <Button bordered dark small icon onPress={() =>{this.onClickSetting()}}
                style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}} >
                <Icon name="md-settings" />
              </Button>
            </Screen>
          </Screen>
        </Screen>
        <Screen style={{paddingHorizontal:10, paddingVertical:10}}>
          <Text style={{fontWeight:'bold'}}>안피곤</Text>
          <Text>작가 프로필 설명</Text>
          <Text>www.~~.com/</Text>
        </Screen>
      </Screen>
    )
  }
}
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
})

export default ProfileTab
