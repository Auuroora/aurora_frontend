/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  Dimensions
} from 'react-native'
import { 
  TextInput,
  TouchableOpacity,
  Image,
  Icon,
  Button,
  Text,
  Divider,
  View
} from '@shoutem/ui'
import axios from '../../axiosConfig'
import AsyncStorage from '@react-native-community/async-storage'


const { width, height } = Dimensions.get('window')

class WritePostScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      title : '',
      fiterId: '',
      tag : '',
      description: '',
      price: '',
      user_id:null,
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault()
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state)
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }

  onPressFunction = (props) =>{
    // title,tag,description, filter_id, price
    props.onClickUpload(this.state.title,this.state.tag, this.state.description, this.state.fiterId, this.state.price) 
  }

  render(){  
    return (
      <View 
        style ={{
          backgroundColor: '#1E1E1E'
        }}>
        <View 
          name = "Filter"
          styleName ="horizontal space-between"
          style ={{
            margin :10
          }}
        >
          <TouchableOpacity 
            onPress ={this.props.onPressNew} 
            styleName="flexible">
            {this.props.imageFile === null ? (
              <Image
                style ={{ height: height*0.11, width :height*0.11 ,padding :10, 
                  backgroundColor: '#1E1E1E'}}
                source={ require('../../assets/image/interface.png') }
              />
            ) : (
              <Image
                style ={{ height: height*0.11, width :height*0.11 ,padding :10}}
                source={{ uri: this.props.imageFile }}
              />
            )}
             
          </TouchableOpacity>
          <Divider styleName="line">
            <TextInput
              name = "title"
              placeholder={'Write Filter Title'}
              style ={{ 
                paddingTop:15, 
                backgroundColor: '#1E1E1E', 
                placeholderTextColor: 'white', 
                height: height/10, width :width*0.7}}
              value={this.state.title}
              maxLength={50}
              onEndEditing ={()=>{ this.props.onEndWriting("title", this.state.title)}}
              onChangeText={(text) => this.setState({title: text})}>
            </TextInput>
          </Divider>
        </View>
        <View styleName ="horizontal space-between" name = "Description" style ={{ margin :10}}>
          <Divider styleName="line">
            <TextInput
              style ={{
                height: height*0.2, width : width,
                placeholderTextColor: 'white', 
                backgroundColor: '#1E1E1E'
              }}
              placeholder={'Write Filter Description'}
              value={this.state.description}
              maxLength={300}
              multiline
              onSubmitEditing ={()=>{this.props.onEndWriting("description", this.state.description)}}
              onChangeText={(text) => this.setState({description: text})}/>
          </Divider>
        </View>
        <View styleName ="horizontal space-between" name = "Tag" style ={{ margin :10}}>
          <Divider styleName="line">
            <TextInput
              placeholder={'Write Filter Tag using #'}
              style ={{
                height: height/12, width :width,
                placeholderTextColor: 'white', 
                backgroundColor: '#1E1E1E'
              }}
              value={this.state.tag}
              maxLength={300}
              onEndEditing ={()=>{ this.props.onEndWriting("tag", this.state.tag)}}
              onChangeText={(text) => this.setState({tag: text})}/>
          </Divider>
        </View>
        <View styleName ="horizontal space-between" name = "Price" style ={{ margin :10}}>
          <Divider styleName="line">
            <TextInput
              placeholder={'Write Filter Price'}
              maxLength={10}
              style ={{ 
                padding:15, 
                height: height/12, 
                width :width,
                placeholderTextColor: 'white', 
                backgroundColor: '#1E1E1E'}}
              value={this.state.price}
              onEndEditing ={()=>{this.props.onEndWriting("price", this.state.price)}}
              onChangeText={(text) => this.setState({price: text})}/>
          </Divider>
        </View>
      </View>
    )
  }
}

export default WritePostScreen