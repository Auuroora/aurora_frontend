/* eslint-disable react/prop-types */
import React, { Component } from 'react'

import {
  StatusBar,
  Dimensions
} from 'react-native'

// Import UI components
import { 
  Image,
  Screen,
  NavigationBar,
  View,
  Card,
  Icon,
  ListView,
  Heading,
  Subtitle,
  Button,
  Text,
  Divider,
  Spinner,
  TouchableOpacity
} from '@shoutem/ui'

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'

const { width, height } = Dimensions.get('window')


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
      isPreview: false
    }
    this.getPostInfo(this.state.postId)
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

  renderTagRow = (data) => {
    return (
      <Button>
        <Text>{data}</Text>
      </Button>
    )
  }
  render () {
    return (
      <Screen styleName='fill-parent'>
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
              <Button onPress={this.onClickPreview}>
                <Icon name="take-a-photo" />
              </Button>
            </View>
          }
        />
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
                <Button>
                  <View styleName="horizontal space-between">
                    <Icon name="like"/>
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
                style={{flex: 50}}
              >
                <Text>
                  {this.state.postData.post_info.description}
                </Text>
              </View>
            </View>
          </Card>
        )}
      </Screen>
    )
  }
}

export default DetailScreen