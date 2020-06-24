/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  NavigationBar,
  ImageBackground,
  Screen,
  Icon,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from '@shoutem/ui'

import axios from '../../axiosConfig'

import Title from '../../Components/Title'
import SelectFilterScreen from './SelectFilterScreen'
import LargeTile from '../../Components/LargeTile'

import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
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
      tag: '',
      price: '',
      isFilterSelected: false
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

  onPressDone = async (filter_id, filter_url, userId) => {
    this.setState({
      isFilterSelected: true,
      isSelectFilter: false,
      filterId: filter_id,
      userId: userId,
      imageFile: filter_url,
    })
  }

  onClickUpload = () =>{
    if (this.state.title && this.state.description  && this.state.filterId && this.state.price) {

      const splitDesc = this.state.description.split(' ')
      let taglist = []

      for (let idx in splitDesc) {
        if (splitDesc[idx].includes('#')) {
          taglist.push(splitDesc[idx])
        }
      }

      taglist = taglist.join(', ')

      const data = {
        post:{
          title: this.state.title,
          description: this.state.description,
          filter_id: this.state.filterId,
          tag_list: taglist,
          price: this.state.price,
          user_id : this.state.userId
        }
      }

      axios.post('/posts', data)
        .then(() => {
          alert('게시글 작성이 완료되었습니다.')
        }).catch((err) => {
          alert('게시글 작성이 실패하였습니다.')
        })

      this.setState({
        filter_id: '',
        userId: -1,
        title: '',
        description: '',
        price: '',
        isFilterSelected: false,
        imageFile: ''
      })

      this.props.navigation.navigate("Home", {
        refresh: true
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
          onRefresh ={this.getUserFilterData}
          state={this.state}/>)
    }
    return (
      <ScrollView>
        <LargeTile
          image={this.state.isFilterSelected ? { uri: this.state.imageFile } : null}
          onClickTile={this.onChooseFilter}
          noImageComment={'탭하여 업로드할 필터를 선택하세요'}
        />
        <TextInput
          placeholder={"제목"}
          value={this.state.title}
          style={{backgroundColor: '#0A0A0A', color: '#FAFAFA'}}
          onChangeText={(text) => this.setState({title: text})}
        />
        <TextInput
          placeholder={"가격"}
          value={this.state.price}
          keyboardType={'number-pad'}
          style={{backgroundColor: '#0A0A0A', color: '#FAFAFA'}}
          onChangeText={(text) => this.setState({price: text})}
        />
        <TextInput
          placeholder={"글 설명, #로 태그"}
          value={this.state.description}
          multiline={true}
          numberOfLines={4}
          style={{height: 500, backgroundColor: '#0A0A0A', color: '#FAFAFA'}}
          onChangeText={(text) => this.setState({description: text})}
        />
      </ScrollView>
    )
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
              <Title title={'판매글 작성'} topMargin={50}/>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => {this.onClickUpload()}}>
                <Icon name="share" style ={{color  :"white", marginRight:15, marginTop: 50, fontSize: 30}} />
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
