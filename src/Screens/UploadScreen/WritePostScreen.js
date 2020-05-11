/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import axios from 'axios'
import {
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native'
import { 
  NavigationBar,
  TextInput,
  ImageBackground,
  Screen,
  TouchableOpacity,
  Icon,
  Image,
  Subtitle,
  Button,
  View
} from '@shoutem/ui'

import ImagePicker from 'react-native-image-picker'

axios.defaults.baseURL = 'http://aurora-application.ap-northeast-2.elasticbeanstalk.com'

const { width, height } = Dimensions.get('window')

/*
게시글 작성 부분과 아닌 부분을 컴포넌트로 분리 할 것인가
이미지 고르는 부분 -> 필터 고르는 부분으로 변경
ui개선
페이스북 인스타그램 연동 기능 추가?
*/
const ImagePickerOptions = {
  title: 'Select Filter',
  customButtons: [
    { 
      name: 'customOptionKey',
      title: 'Choose Photo from Custom Option'
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}
class UploadScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imageFile: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941',
      isSelectFilter: false,
      title : '',
      fiterId: 0,
      tag : '',
      description: '',
      price: 0,
    }
  }
  onChooseFilter = () => {
    //filter를 선택하는 화면으로 이동
    // ImagePicker.showImagePicker(ImagePickerOptions, async response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker')
    //     return
    //   }
    //   if (response.error) {
    //     return
    //   }
    //   if (response.customButton) {
    //     return
    //   } 
    //   let source = response
    //   this.setState({
    //     imageFile: 'data:image/jpeg;base64,'+ source.data,
    //     isSelectFilter: true
    //   })
    // })
    this.setState({
      isSelectFilter: true
    })
  }
  onClickUpload =async () => {
    // user_id & filter_id 
    if (this.state.title && this.state.tag && this.state.description && this.state.price) {
      const data = {
        title: this.state.title,
        description: this.state.description,
        tag: this.state.tag,
        price: this.state.price
      }
      return axios.post('/posts', data)
        .then(() => {
          alert('게시글 작성이 완료되었습니다.')
        }).catch(() => {
          alert('게시글 작성이 실패하였습니다.')
        })
    }
    else{
      alert('모든 부분을 작성하여 주세요.')
    }
  }
  render(){
    return (
      <View>
        <View styleName ="horizontal space-between" name = "Title" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Title</Subtitle>
          <TextInput
            placeholder={'Write Filter Title'}
            style ={{ paddingTop:15, backgroundColor: 'white', height: height/10, width :width*0.7}}
            value={this.state.title}
            maxLength={10}
            onChangeText={(text) => this.setState({title: text})}/>
        </View>
        <View name = "Description" styleName ="horizontal space-between" style ={{margin :10}}>
          <TouchableOpacity 
            onPress ={this.onChooseFilter} 
            styleName="flexible">
            <Image
              style ={{ height: height*0.15, width :height*0.15 ,padding :10}}
              source={{ uri:this.state.imageFile }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'Write Filter Description'}
            style ={{ height: height*0.15, width : width*0.7 }}
            value={this.state.description}
            maxLength={50}
            onChangeText={(text) => this.setState({description: text})}/>
        </View>
        <View styleName ="horizontal space-between" name = "Tag" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Tag</Subtitle>
          <TextInput
            placeholder={'Write Filter Tag using #'}
            style ={{ hpadding:15, height: height/12, width :width*0.7}}
            value={this.state.tag}
            maxLength={50}
            onChangeText={(text) => this.setState({tag: text})}/>
        </View>
        <View styleName ="horizontal space-between" name = "Price" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Price</Subtitle>
          <TextInput
            placeholder={'Write Filter Price'}
            maxLength={5}
            style ={{ padding:15, height: height/12, width :width*0.7}}
            value={this.state.price}
            onChangeText={(text) => this.setState({price: text})}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color : 'black',
    paddingLeft :10
  }
})

export default UploadScreen