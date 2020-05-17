/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import axios from '../../axiosConfig'
import {
  Dimensions,
  StyleSheet
} from 'react-native'
import { 
  TextInput,
  TouchableOpacity,
  Image,
  Icon,
  Subtitle,
  Button,
  Text,
  View
} from '@shoutem/ui'

import AsyncStorage from '@react-native-community/async-storage'


const { width, height } = Dimensions.get('window')
class WritePostScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imageFile: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941',
      title : '',
      fiterId: '',
      tag : '',
      description: '',
      price: '',
    }
  }
  onClickUpload = async () => {
    const userData = await AsyncStorage.getItem('@Aurora:' + 'userToken')
    const headers = {
      'Authorization': userData
    }
    if (this.state.title && this.state.tag && this.state.description  && this.props.filterId && this.state.price) {
      const data = {
        post:{
          title: this.state.title,
          description: this.state.description,
          filter_id: this.props.filterId,
          tag_list: this.state.tag,
          price: this.state.price
        }
      }
      console.log(data)
      return axios.post('/posts', data,{headers:headers})
        .then((response) => {
          console.log(response.data)
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
            onChangeText={(text) =>  this.setState( prevState =>({
              post:{
                ...prevState.title,
                [this.state.title]:{text}
              }
            }))}/>
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
        <View style ={{paddingTop:30, alignItems: 'center',}}>
          <Button styleName="secondary" style ={{width:100}} 
            onPress={() => {this.onClickUpload()}}>
            <Icon name="share" />
            <Text>UPLOAD</Text>
          </Button>
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