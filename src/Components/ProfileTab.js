import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import {Container, Content, Header, Left, Body, Right, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

class ProfileTab extends Component{
  render(){
    return (
      <Container>
        <Header>
          <Left style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>작가이름</Text>
          </Left>
          <Right style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name='md-person-add'  style={{paddingRight:10, fontSize:23}}/>
            <Button rounded onPress={() =>{alert("설정으로 이동")}} >
              <Icon name='md-menu'/>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{flexDirection:'row', paddingTop:10}}>
            <View style={{flex:1, alignItems:'center'}}>
              <Image source={require('../image/writer.jpg')}
                style={{width:75, height:75, borderRadius:37.5}}/>
            </View>
            <View style={{flex:3}}>
              <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <View style={{alignItems:'center'}}>
                  <Text>167</Text>
                  <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text>346</Text>
                  <Text style={{fontSize:10, color:'gray'}}>follower</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text>192</Text>
                  <Text style={{fontSize:10, color:'gray'}}>following</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <Button bordered dark onPress={() =>{alert("프로필 수정")}}
                  style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                  <Text>Edit Profile</Text>
                </Button>
                <Button bordered dark small icon
                  style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
                  <Icon name="md-settings" />
                </Button>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal:10, paddingVertical:10}}>
            <Text style={{fontWeight:'bold'}}>안피곤</Text>
            <Text>작가 프로필 설명</Text>
            <Text>www.~~.com/</Text>
          </View>
        </Content>
      </Container>
    )
  }
}
export default ProfileTab
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
})

