/* eslint-disable react/prop-types */
import React, { Component } from 'react'

import {
  Dimensions
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
  TextInput,
  GridRow,
  TouchableOpacity
} from '@shoutem/ui'

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'

import Comment from './commentList'
import Icons from 'react-native-vector-icons/dist/Ionicons'


const { width } = Dimensions.get('window')


/* TODO
 * 1. 장바구니에 추가하는 api 작성 필요
 장바구니 추가 이벤트 + API 호출 → 장바구니에 추가되었다는 메세지 출력
 */

class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postId: props.route.params.postId,
      postData : null,
      isLoading: true,
      imageFile: [],
      isPreview: false,
      myComment: [],
      commentData:[]
    }
    this.getPostInfo(this.state.postId)
    this.getCommentInfo(this.state.postId)
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

  onClickPostImage = () => {
    this.setState({
      imageFile: [{
        source: { uri: AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_name},
        title: 'Image Preview',
        width: width,
      }],
      isPreview: true,
    })
  }

  onClickPreview = () => {
    const ImagePickerOptions = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      if (response.error) {
        return
      }
      if (response.customButton) {
        return
      } 

      // apply image filter 
  
  
      // watermark

      this.setState({
        imageFile: [{
          source: response,
          title: 'Image Preview',
          width: response.width,
          height: response.height,
        }],
        isPreview: true
      })
    })
  }

  onClickCart = () => {
    
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
  
  getCommentInfo = async (postId) => {
    const params = {
      params: {
        commentable_type : "Post",
        commentable_id :postId
      }
    }
    const res = await axios.get('/comments', params)
    console.log(res.data)
    await this.setState({commentData : res.data})
  }
  postCommentInfo = async () => {
    const data = {
      comment: {
        commentable_type : "Post",
        commentable_id : this.state.postId,
        body :this.state.myComment
      }
    }
    await axios.post('/comments', data).then(() =>{
      alert("댓글을 작성 하였습니다.")
    })
      .catch((err) => {
        alert("Failed to Write Comment : ", err)
      })
    
    this.getCommentInfo(this.state.postId)
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
      <Screen>
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
              <Button onPress={this.onClickPreview}>
                <Icon name="take-a-photo" />
              </Button>
            </View>
          }
        />
        <ScrollView styleName = "fill-parent">
          {this.state.isLoading ? (
            <Spinner styleName='large'/>
          ) : (
            <Card 
              style={{width: width}}
              styleName="flexible"
            >
              <ImageView
                images={this.state.imageFile}
                imageIndex={0}
                isVisible={this.state.isPreview}
                isSwipeCloseEnabled={true}
                onClose={() => {this.setState({isPreview: false})}}
              />

              <TouchableOpacity
                onPress={this.onClickPostImage}
              >
                <Image
                  style={{width: width, height: width}}
                  source={{ uri: AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_name}}
                />
              </TouchableOpacity>
              <View styleName="content">
                <Heading numberOfLines={2}>{this.state.postData.post_info.title}</Heading>
                <View styleName="horizontal space-between">
                  <Subtitle>판매 가격 : {this.state.postData.post_info.price}</Subtitle>
                  <Button onPress={() => this.onClickLike(this.props)}>
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
          <View 
            styleName="horizontal space-between" 
            style ={{width: '100%', height: '10%', backgroundColor: 'white'}}>
            <TextInput 
              placeholder={'Write Comment'} 
              style ={{placeholderTextColor: 'black', width: '90%', backgroundColor: 'white' }}
              
              value={this.state.myComment}
              onChangeText={(text) => this.setState({myComment: text})}/>
            <TouchableOpacity onPress={() => this.postCommentInfo()}>
              <Image
                source={ require('../../assets/image/blog.png' )}
                style={{ width: 25, height: 25, color :'white', marginBottom :15, marginRight :15}}
              />
            </TouchableOpacity>
          </View>
          {/* {this.state.commentData.map((comment, id) => {
            return (
              <Comment 
                key={id}
                comment = {comment.comment_info.body}
                name = {comment.user_info.author_name}
              />
            )
          })} */}
        </ScrollView>
      </Screen>
    )
  }
}

export default DetailScreen