import React, { Component } from 'react'

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
        name: props.username,
        description: "This is a space where you can write \nthe author's comments\n",
        posts: props.postCount,
        follower: props.follower,
        following : props.followee,
        image: { url: "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg" },
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
        <Screen 
          style={{
            flexDirection:'row',
            paddingTop:10
          }}
        >
          <Screen 
            style={{
              flex:1,
              alignItems:'center'
            }}
          >
            <Image 
              source={{
                uri: profile.image.url
              }}
              style={{
                width: 80,
                height:80,
                borderRadius:37.5
              }}
            />
            <Subtitle 
              style={{
                fontWeight: 'bold',
                marginTop: 5
              }}
            >
              {profile.name}
            </Subtitle>
          </Screen>
          <Screen 
            style={{
              flex:3,
              marginTop: 20
            }}
          >
            <Screen 
              style={{
                flexDirection:'row',
                justifyContent:'space-around'
              }}
            >
              <Screen 
                style={{
                  alignItems:'center'
                }}
              >
                <Text>
                  {profile.posts}
                </Text>
                <Text 
                  style={{
                    fontSize:12, color:'gray'
                  }}
                >
                  Posts
                </Text>
              </Screen>
              
              <Screen style={{alignItems:'center'}}>
                <Text>
                  {profile.follower}
                </Text>
                <Text 
                  style={{
                    fontSize:12,
                    color:'gray'
                  }}
                >
                  follower
                </Text>
              </Screen>
              <Screen 
                style={{
                  alignItems:'center'
                }}
              >
                <Text>
                  {profile.following}
                </Text>
                <Text 
                  style={{
                    fontSize:12,
                    color:'gray'
                  }}
                >
                  Following
                </Text>
              </Screen>
            </Screen>
            <Screen 
              style={{
                flexDirection:'row'
              }}
            >
              <Button 
                bordered
                dark
                onPress={() =>{alert("프로필 수정")}}
                style={{
                  flex:4,
                  marginLeft:10,
                  justifyContent:'center',
                  height:height / 30,
                  marginTop:10}}
              >
                <Icon name="edit" />
              </Button>

              <Button 
                bordered
                dark
                small
                icon
                onPress={() =>{this.onClickSetting()}}
                style={{
                  flex:1,
                  marginRight:10,
                  marginLeft:5,
                  justifyContent:'center',
                  height:height / 30,
                  marginTop:10
                }}
              >
                <Icon name="settings"/>
              </Button>
            </Screen>
          </Screen>
        </Screen>
        <Screen 
          style={{
            paddingHorizontal:10,
            paddingVertical:10
          }}
        >
          <Subtitle numberOfLines={2}>
            {profile.description}
          </Subtitle>
        </Screen>
      </Screen>
    )
  }
}

export default ProfileTab
