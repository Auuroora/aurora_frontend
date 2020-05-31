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
  TextInput,
  TouchableOpacity
} from '@shoutem/ui'

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'
import Comment from './commentList'
import ImgToBase64 from 'react-native-image-base64'
import { loadImg, getWatermarkedImg } from '../../OpencvJs'
import { mapCvFunction } from '../../utils'


const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}
const { width, height } = Dimensions.get('window')


class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postId: props.route.params.postId,
      postData : null,
      isLoading: true,
      imageFile: [],
      isPreview: false,
      myComment: '',
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

  onClickPreview = async () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      if (response.error) {
        return
      }

      await loadImg(response.data, response.width, response.height)

      const filter = await fetch(AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_data_path)
      const preset = await filter.json()

      let resultImg = null

      for (let key in preset) {
        const modifyFunc = mapCvFunction(key)
        try {
          resultImg = await modifyFunc(preset[key])
        } catch (e) {
          console.log(e)
        }
      }

      const res = await ImgToBase64.getBase64String(AWS_S3_STORAGE_URL + 'assets/watermark.png')
      const preview = await getWatermarkedImg(resultImg, res, response.width, response.height)

      this.setState({
        imageFile: [{
          source: { uri: 'data:image/jpeg;base64,' + preview},
          title: 'Image Preview',
          width: response.width,
          height: response.height,
        }],
        isPreview: true
      })
    })
  }

  onClickCart = async() => {
    const data = {
      line_filter: {
        filter_id : this.state.postData.filter_info.id,
        amount : this.state.postData.post_info.price
      }
    }
    console.log(data)
    await axios.post('/line_filters', data).then((res) =>{
      console.log(res.data)
      alert("장바구니에 담았습니다")
    })
      .catch((err) => {
        alert("Failed to Add bucket : ", err)
      })
  }

  getCommentInfo = async (postId) => {
    const params = {
      params: {
        commentable_type : "Post",
        commentable_id :postId
      }
    }
    const res = await axios.get('/comments', params)
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
    if(this.state.myComment){
      
      await axios.post('/comments', data).then(() =>{
        alert("댓글을 작성 하였습니다.")
      })
        .catch((err) => {
          alert("Failed to Write Comment : ", err)
        })
      this.getCommentInfo(this.state.postId)
      this.setState({myComment:''})
    }
    else{
      alert("댓글을 작성하여주세요")
    }
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
      <Button 
        style={{
          backgroundColor: '#1E1E1E',
          marginRight:5,
          marginTop: 10,
          borderRadius:10,
        }}>
        <Text
          style={{
            color: 'white',
          }}>{data}</Text>
      </Button>
    )
  }
  
  render () {
    return (
      <Screen 
        style={{backgroundColor: '#1E1E1E'}}
      >
        <NavigationBar
          styleName='inline clear'
          style={{
            container: {
              backgroundColor: '#1E1E1E'
            },
          }}
          centerComponent={<Title title={'Details'}/>}
          rightComponent={
            <View 
              style={{marginTop: 25}}
              styleName="horizontal space-between ">
              <TouchableOpacity onPress={() => {this.onClickCart()}}>
                <Image
                  source={ require('../../assets/image/add-to-cart.png' )}
                  style={{ width: 22, height: 22, color :'white', marginRight : 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickPreview}>
                <Image
                  source={ require('../../assets/image/photo-camera.png' )}
                  style={{ width: 23, height: 23, color :'white', marginRight : 20 }}
                />
              </TouchableOpacity>
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
              <View 
                styleName="content" 
                style={{
                  backgroundColor: '#1E1E1E',
                }}>
                <Heading 
                  numberOfLines={2}
                  style={{
                    color: 'white',
                  }}>
                  {this.state.postData.post_info.title}
                </Heading>
                <View styleName="horizontal space-between">
                  <Subtitle style={{
                    color: 'white',
                    marginTop: 10
                  }}>판매 가격 : {this.state.postData.post_info.price}원</Subtitle>
                  <TouchableOpacity onPress={() => this.onClickLike(this.props)}>
                    <View styleName="horizontal space-between">
                      {this.state.postData.like_info.liked ? (
                        <Image
                          source={ require('../../assets/image/heart_pink.png' )}
                          style={{ width: 20, height: 20, color :'red', marginRight :10 }}
                        />
                      ) : (
                        <Image
                          source={ require('../../assets/image/heart-white.png' )}
                          style={{ width: 20, height: 20,  marginRight :10 }}
                        />
                      )}
                      <Text
                        style={{
                          color: 'white',
                        }}>
                        {this.state.postData.like_info.liked_count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <ListView
                  style={{
                    width: '50%',
                    listContent: {
                      backgroundColor: '#1E1E1E',
                    }
                  }}
                  data={this.state.postData.tag_info.tag_list}
                  horizontal={true}
                  renderRow={this.renderTagRow}
                />
                <Divider></Divider>
                <View
                  style={{
                    flex: 40,
                    backgroundColor: '#1E1E1E',
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {this.state.postData.post_info.description}
                  </Text>
                </View>
              </View>
            </Card>
          )}
          
          <View 
            styleName="horizontal space-between" 
            style ={{
              justifyContent: 'center',
              width: width, 
              height: '4%', 
              backgroundColor: '#1E1E1E',
            }}>
            <TextInput 
              placeholder={'Write Comment'} 
              style ={{
                placeholderTextColor: 'white', 
                width: '90%', 
                backgroundColor: '#1E1E1E',
              }}
              value={this.state.myComment}
              onChangeText={(text) => this.setState({myComment: text})}/>
            <TouchableOpacity onPress={() => this.postCommentInfo()}>
              <Image
                source={ require('../../assets/image/blogging.png' )}
                style={{ width: 25, height: 25, color :'white', marginBottom :15, marginRight :15}}
              />
            </TouchableOpacity>
          </View>
          {this.state.commentData.map((comment, id) => {
            return (
              <Comment 
                key={id}
                comment = {comment.comment_info.body}
                name = {comment.user_info.author_name}
              />
            )
          })}
        </ScrollView>
      </Screen>
    )
  }
}

export default DetailScreen