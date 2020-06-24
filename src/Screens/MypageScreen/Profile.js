import React, { Component } from 'react'

import {
  Screen,
  View,
  Image,
  Text,
  Subtitle,
} from '@shoutem/ui'

import {AWS_S3_STORAGE_URL} from 'react-native-dotenv'


class ProfileTab extends Component{
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        name: props.username,
        posts: props.postCount,
        cash: props.cash,
        email : props.email,
        image: props.profile,
      }
    }
  }

  render(){
    const profile = this.state.profile
    return (
      <Screen style={{
        backgroundColor: '#333333'
      }}>
        <View 
          style={{
            flexDirection:'row',
            paddingTop:10
          }}
        >
          <View 
            style={{
              flex:1,
              alignItems:'center'
            }}
          >
            <Image 
              source={this.props.profile}
              style={{
                width: 80,
                height: 80,
                borderRadius: 37.5
              }}
            />
            <Subtitle 
              style={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginTop: 5
              }}
            >
              {profile.name}
            </Subtitle>
          </View>
          <View 
            style={{
              flex:3,
              marginTop: 20,
            }}
          >
            <View 
              // style={{
              //   flexDirection:'row',
              //   justifyContent:'space-around'
              // }}
            >
              <View 
                style={{
                //   alignItems:'center',
                  flexDirection:'row',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FEFEFE',
                  }}
                >
                Posts Count:  {profile.posts}
                </Text>
              </View>
              
              <View 
              // style={{alignItems:'center'}}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FEFEFE',
                  }}
                >
                email:  {profile.email}
                </Text>

              </View>
              <View 
                // style={{
                //   alignItems:'center'
                // }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FEFEFE',
                  }}
                >
                cash:  {profile.cash}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Screen>
    )
  }
}

export default ProfileTab
