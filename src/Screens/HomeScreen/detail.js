/* eslint-disable react/prop-types */
import React, { Component } from 'react'

import {
  StatusBar,
  Dimensions,
  Modal
} from 'react-native'

// Import UI components
import { 
  Image,
  Screen,
  NavigationBar,
  View,
  Card,
  ListView,
  Heading,
  Subtitle,
  Button,
  Text,
  Divider,
  ScrollView,
  Spinner,
  Icon,
  TextInput
} from '@shoutem/ui'
import ImageViewer from 'react-native-image-zoom-viewer'

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import axios from '../../axiosConfig'

import Comment from './commentList'
import Icons from 'react-native-vector-icons/dist/Ionicons'
const { width, height } = Dimensions.get('window')


/* TODO
 * 1. 장바구니에 추가하는 api 작성 필요
 장바구니 추가 이벤트 + API 호출 → 장바구니에 추가되었다는 메세지 출력
 */
function onClickCart(){
  
}

class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postId: props.route.params.postId,
      postData : null,
      isLoading: true,
    }
    this.getPostInfo(this.state.postId)
  }

  getPostInfo = async (postId) => {
    const params = {
      params: {
        user_info: true,
        filter_info: true,
        tag_info: true,
        like_info: true
      }
    }
    const res = await axios.get('/posts/' + postId, params)
    await this.setState({postData : res.data})
    this.setState({isLoading: false})
  }
  onClickLike = async() => {
    const data = {
      liker:"user",
      likeable:"post",
      likeable_id :this.state.postId
    }
    const params = {
      params: {
        user_info: true,
        filter_info: true,
        tag_info: true,
        like_info: true
      }
    }
    await axios.post('/likes', data)
    const res = await axios.get('/posts/' + this.state.postId, params)
    await this.setState({postData : res.data})
    console.log( res.data.like_info.liked)
    console.log( res.data.like_info.liked)
  }

  renderTagRow = (data) => {
    return (
      <Button>
        <Text>{data}</Text>
      </Button>
    )
  }
  render () {
    return (
      <View>
        <ScrollView style ={{width: '100%', height: '90%'}}>
          <StatusBar barStyle="dark-content"/>
          <NavigationBar
            styleName='inline'
            centerComponent={<Title title={'Details'}/>}
            rightComponent={
              <View 
                style={{marginTop: 25}}
                styleName="horizontal space-between">
                <Button onPress={() => {this.onClickCart()}}>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icons name="camera"  style ={{fontSize:20}}/>
                </Button>
              </View>
            }
          />
          {this.state.isLoading ? (
            <Spinner styleName='large'/>
          ) : (
            <Card 
              style={{width: width, flex: 2, justifyContent: 'center', alignItems: 'center',}}
              styleName="flexible"
            >
              <Image
                style={{width: width, height: width}}
                source={{ uri: AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_name}}
              />
              <View styleName="content">
                <Heading numberOfLines={2}>{this.state.postData.post_info.title}</Heading>
                <View styleName="horizontal space-between">
                  <Subtitle>판매 가격 : {this.state.postData.post_info.price}</Subtitle>
                  <Button onPress={() => this.onClickLike()}>
                    <View styleName="horizontal space-between">
                      {this.state.postData.like_info.liked ? (
                        <Image
                          source={ require('../../assets/image/heart_pink.png' )}
                          style={{ width: 20, height: 20, color :'red', marginRight :10 }}
                        />
                      ) : (
                        <Image
                          source={ require('../../assets/image/heart.png' )}
                          style={{ width: 20, height: 20,  marginRight :10 }}
                        />
                      )}
                      <Text>{this.state.postData.like_info.liked_count}</Text>
                    </View>
                  </Button>
                </View>
                <ListView
                  style={{width: '50%'}}
                  data={this.state.postData.tag_info.tag_list}
                  horizontal={true}
                  renderRow={this.renderTagRow}
                />
                <Divider></Divider>
                <View
                  style={{flex: 40}}
                >
                  <Text>
                    {this.state.postData.post_info.description}
                  </Text>
                </View>
              </View>
            </Card>
          )}
          <Comment></Comment>
        </ScrollView>
        <View  styleName="horizontal space-between" style ={{width: '100%', height: '10%'}}>
          <TextInput 
            placeholder={'Write Comment'} style ={{width: '90%'}}/>
          <Icons name="comments" style ={{fontSize:20}}/>
        </View>
          
      </View>
    )
  }
}

export default DetailScreen