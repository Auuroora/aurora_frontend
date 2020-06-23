/* eslint-disable react/prop-types */
import React, {Component,} from 'react'
import {
  Dimensions
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  Icon,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Divider,
  Image
} from '@shoutem/ui'

import axios from '../../axiosConfig'

/*
    1. 수정 버튼을 누르면
    2. 수정화면으로 이동 (화면엔 내용이 채워져있음)
     -- 필터와 가격은 변경하면 안되지 않나? description과 title만 변경?
     -- 인스타그램을 보니 사진은 변경이 안되고, 글 수정만 가능
    3. 수정 후 재 업로드.
    : upload page 리팩토링 후 진행
*/
import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
const { width } = Dimensions.get('window')
class ModifyScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imageFile: this.props.route.params.postImg,
      isSelectFilter: false,
      filterData:[],
      filterId: this.props.route.params.filterID,
      userId:-1,
      postId :  this.props.route.params.postId,
      tag:  '',
      price: (this.props.route.params.postPrice).toString(),
      description: this.props.route.params.postDescription,
      title: this.props.route.params.postTitle,
    }
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
        }
      }
      
      axios.put('/posts/'+ this.state.postId, data)
        .then(() => {
          alert('게시글 수정이 완료되었습니다.')
        }).catch((err) => {
          console.log(err)
          alert('게시글 수정이 실패하였습니다.')
        })
      this.props.navigation.navigate('Detail', {postId: this.state.postId})
    }
    else{
      alert('모든 부분을 작성하여 주세요.')
    }
  }
  render(){
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
              <Title title={'Modify'} topMargin={50}/>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => {this.onClickUpload()}}>
                <Icon name="share" style ={{color  :"white", marginRight:15}} />
              </TouchableOpacity>
            }
          />
        </ImageBackground>
        
        <ScrollView>
          <Image
            style={{width: width, height: width}}
            source={{ uri: AWS_S3_STORAGE_URL + this.state.imageFile}}
          />
          <TextInput 
            style={{backgroundColor: '#0A0A0A', color: 'white'}}
            value={this.state.title}
            onChangeText={(text) => this.setState({title: text})}
          />
          <TextInput 
            style={{backgroundColor: '#0A0A0A', color: 'white'}}
            value={this.state.price}
            keyboardType={'number-pad'}
            onChangeText={(text) => this.setState({price: text})}
          />
          <TextInput 
            style={{height: 100, backgroundColor: '#0A0A0A', color: 'white'}}
            value={this.state.description}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({description: text})}
          /> 
        </ScrollView>
      </Screen>
    )
  }
}
export default ModifyScreen
