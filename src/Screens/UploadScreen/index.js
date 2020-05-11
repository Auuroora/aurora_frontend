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
  ImageBackground,
  Screen,
  Icon,
  Button,
} from '@shoutem/ui'

import Title from '../../Components/Title'
import SelectFilterScreen from './SelectFilterScreen'
import WritePostScreen from './WritePostScreen'

axios.defaults.baseURL = 'http://aurora-application.ap-northeast-2.elasticbeanstalk.com'

class UploadScreen extends Component{
  constructor() {
    super()
    this.state = {
      imageFile: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941',
      isSelectFilter: false,
      title : '',
      filterId: 0,
      tag : '',
      description: '',
      price: 0,
    }
  }
  onChooseFilter = () => {
    this.setState({
      isSelectFilter: true,
    })
  }
  
  onPressDone = async(filter_id) => {
    this.setState({
      isSelectFilter: false,
      filterId: filter_id
    })
    console.log(filter_id)
  }
  onClickUpload = async () => {
    console.log("??",this.state.filterId)
    if (this.state.title && this.state.tag && this.state.description  && this.state.filterId && this.state.price) {
      const data = {
        title: this.state.title,
        description: this.state.description,
        filter_id: this.state.filterId,
        tag_list: this.state.tag,
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
  bindScreen = () => {
    if (this.state.isSelectFilter) {
      return (
        <SelectFilterScreen
          onPressDone={this.onPressDone} 
          isSelectFilter={this.state.isSelectFilter}
          filterId={this.state.filterId}/>)
    
    }
    return (
      <WritePostScreen 
        onPressNew={this.onChooseFilter}
        filterId={this.state.filterId} />)
  }
  render(){
    let currentView = this.bindScreen()
    return (
      <Screen styleName='fill-parent' style ={{backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground
          source={{uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}}
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
              <Button  onPress={() => {
                this.onClickUpload()
              }}>
                <Icon name="share" />
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
