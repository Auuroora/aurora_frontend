import React, { Component } from 'react'
import { 
  StyleSheet,
} from 'react-native'

import {
  Screen,
  Image,
  Text,
  Button,
  Subtitle,
  Icon
} from '@shoutem/ui'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


class ProfileTab extends Component{
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        "name": "Auuuuurora",
        "description": "This is a space where you can write \nthe author's comments\n",
        "posts": "150",
        "follower": "230",
        "following" : "100",
        "image": { "url": "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg" },
      }
    }
  }
  onClickSetting = async () => {
    this.props.navigation.navigate('Settingstack')
  }
  render(){
    const profile = this.state.profile
    return (
      <Screen>
        <Screen style={{flexDirection:'row', paddingTop:10}}>
          <Screen style={{flex:1, alignItems:'center'}}>
            <Image source={{uri: profile.image.url}}
              style={{width: 80, height:80, borderRadius:37.5}}/>
          </Screen>
          <Screen style={{flex:3}}>
            <Screen style={{flexDirection:'row', justifyContent:'space-around'}}>
              <Screen style={{alignItems:'center'}}>
                <Text>{profile.posts}</Text>
                <Text style={{fontSize:12, color:'gray'}}>posts</Text>
              </Screen>
              <Screen style={{alignItems:'center'}}>
                <Text>{profile.follower}</Text>
                <Text style={{fontSize:12, color:'gray'}}>follower</Text>
              </Screen>
              <Screen style={{alignItems:'center'}}>
                <Text>{profile.following}</Text>
                <Text style={{fontSize:12, color:'gray'}}>following</Text>
              </Screen>
            </Screen>
            <Screen style={{flexDirection:'row'}}>
              <Button bordered dark onPress={() =>{alert("프로필 수정")}}
                style={{flex:4, marginLeft:10, justifyContent:'center', height:height / 30, marginTop:10}}>
                <Icon name="edit" />
              </Button>
              <Button bordered dark small icon onPress={() =>{this.onClickSetting()}}
                style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:height / 30, marginTop:10}} >
                <Icon name="settings" />
              </Button>
            </Screen>
          </Screen>
        </Screen>
        <Screen style={{paddingHorizontal:10,paddingVertical:10}}>
          <Subtitle >{profile.name}</Subtitle>
          <Subtitle numberOfLines={2}>{profile.description}</Subtitle>
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
