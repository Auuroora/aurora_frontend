/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  Icon,
  TouchableOpacity,
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
      imageFile: null,
      isSelectFilter: false,
      filterData:[],
      filter_id: '',
      userId:-1,
      title: '',
      description: '',
      tag:'',
      price:'',
    } 
    this.getUserFilterData()
  }
  onChooseFilter = () => {
    this.setState({
      isSelectFilter: true,
    })
  }
  
  getUserFilterData = () => {
    axios.get('/myfilter').then(res => {
      const filterData = res.data.my_filter
      console.log(res.data)
      this.setState({
        filterData: filterData,
      }) 
    })
  }
  onEndWriting = async (text, text_input) => {
    if(text == 'title') this.setState({title:text_input})
    else if(text == 'description') this.setState({description:text_input})
    else if(text == 'tag') this.setState({tag:text_input})
    else if(text == 'price') this.setState({price:text_input})
  }

  onPressDone = async(filter_id, filter_url, userId) => {
    this.setState({
      isSelectFilter: false,
      filterId: filter_id,
      userId: userId,
      imageFile: filter_url,
    })
  }
  onClickUpload = () =>{
    const data = {
      post:{
        title: this.state.title,
        description: this.state.description,
        filter_id: this.state.filterId,
        tag_list: this.state.tag,
        price: this.state.price,
        user_id : this.state.userId
      }
    }
    console.log(data)
    if (this.state.title && this.state.tag && this.state.description  && this.state.filterId && this.state.price) {
      const data = {
        post:{
          title: this.state.title,
          description: this.state.description,
          filter_id: this.state.filterId,
          tag_list: this.state.tag,
          price: this.state.price,
          user_id : this.state.userId
        }
      }
      console.log(data)
      return axios.post('/posts', data)
        .then(() => {
          alert('게시글 작성이 완료되었습니다.')

        }).catch((err) => {
          console.log(err)
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
          filterData = {this.state.filterData}
          userId ={this.state.userId}
          state={this.state}/>)
    }
    return (
      <WritePostScreen 
        onPressNew={this.onChooseFilter}
        filterId={this.state.filterId} 
        imageFile={this.state.imageFile}
        onEndWriting ={this.onEndWriting}
        onChangeTextHandler={(text) => this.setState({title: text})}
      />)
  }
  render(){
    let currentView = this.bindScreen()
    return (
      <Screen styleName='fill-parent' style ={{ backgroundColor:'#1E1E1E'}}>
        <ImageBackground
          source={require('../../assets/image/Header.jpg')}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <TouchableOpacity>
                <Icon name="left-arrow" />
              </TouchableOpacity>
            }
            centerComponent={
              <Title title={'Upload'} topMargin={50}/>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => {this.onClickUpload()}}>
                <Icon name="share" style ={{color  :"white", marginRight:15}} />
              </TouchableOpacity>
            }
          />
        </ImageBackground>
        {currentView}
      </Screen>
    )
  }
}
export default UploadScreen
