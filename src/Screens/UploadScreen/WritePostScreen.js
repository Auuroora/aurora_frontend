/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import axios from 'axios'
import {
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

import PropTypes from 'prop-types'
axios.defaults.baseURL = 'http://aurora-application.ap-northeast-2.elasticbeanstalk.com'

const { width, height } = Dimensions.get('window')

/*
게시글 작성 부분과 아닌 부분을 컴포넌트로 분리 할 것인가
이미지 고르는 부분 -> 필터 고르는 부분으로 변경
ui개선
페이스북 인스타그램 연동 기능 추가?
*/

class WritePostScreen extends Component{
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
  render(){
    return (
      <View>
        <View styleName ="horizontal space-between" name = "Title" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Title{this.state.filterId}</Subtitle>
          <Subtitle style ={styles.text}>{this.props.filterId}</Subtitle>
          <TextInput
            placeholder={'Write Filter Title'}
            style ={{ paddingTop:15, backgroundColor: 'white', height: height/10, width :width*0.7}}
            value={this.state.title}
            maxLength={10}
            onChangeText={(text) => this.setState({title: text})}/>
        </View>
        <View name = "Description" styleName ="horizontal space-between" style ={{margin :10}}>
          <TouchableOpacity 
            onPress ={this.props.onPressNew} 
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

export default WritePostScreen