/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StatusBar
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  Icon,
  Button,
} from '@shoutem/ui'

import AsyncStorage from '@react-native-community/async-storage'
import axios from '../../axiosConfig'

import Title from '../../Components/Title'
import SelectFilterScreen from './SelectFilterScreen'
import WritePostScreen from './WritePostScreen'
/* TODO
 * 1. 자기 소유의 필터목록을 보여줌 -> 샘플데이터로
 * 2. 폼 작성 - title description user_id filter_id price tag_list
 * 3. API Server에 업로드
 */
class UploadScreen extends Component{
  constructor() {
    super()
    this.state = {
      imageFile: '',
      isSelectFilter: false,
    } 
  }
  onChooseFilter = () => {
    this.setState({
      isSelectFilter: true,
    })
  }
  onPressDone = async(filter_id, filter_url) => {
    this.setState({
      isSelectFilter: false,
      filterId: filter_id,
      imageFile: filter_url
    })
  }
  async onClickUpload(title,tag,description, filter_id, price){
    const userData = await AsyncStorage.getItem('@Aurora:' + 'userToken')
    const headers = {
      'Authorization': userData
    }
    console.log(title)
    console.log(tag)
    console.log(description)
    if (title && tag && description  && filter_id && price) {
      const data = {
        post:{
          title: title,
          description: description,
          filter_id:filter_id,
          tag_list: tag,
          price: price
        }
      }
      console.log(data)
      // return axios.post('/posts', data,{headers:headers})
      //   .then((response) => {
      //     console.log(response.data)
      //     alert('게시글 작성이 완료되었습니다.')
      //   }).catch((err) => {
      //     console.log(err)
      //     alert('게시글 작성이 실패하였습니다.')
      //   })
    }
    else{
      alert('모든 부분을 작성하여 주세요.')
    }
  }

  bindScreen = () => {
    if (this.state.isSelectFilter) {
      return (
        <SelectFilterScreen
          onPressDone={this.onPressDone} 
          isSelectFilter={this.state.isSelectFilter}
          state={this.state}/>)
    }
    return (
      <WritePostScreen 
        onPressNew={this.onChooseFilter}
        filterId={this.state.filterId} 
        imageFile={this.state.imageFile}
        onClickUpload = {this.onClickUpload}/>)
  }
  render(){
    let currentView = this.bindScreen()
    return (
      <Screen styleName='fill-parent' style ={{backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground
          source={require('../../assets/image/Header.jpg')}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <Button>
                <Icon name="left-arrow" />
              </Button>
            }
            centerComponent={
              <Title title={'Upload'} topMargin={50}/>
            }
            rightComponent={
              <Button onPress={() => {this.onClickUpload()}}>
                <Icon name="share" style ={{color  :"white"}}/>
              </Button>
            }
          />
        </ImageBackground>
        {currentView}
      </Screen>
    )
  }
}
export default UploadScreen
