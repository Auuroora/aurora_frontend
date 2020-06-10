import React, { Component } from 'react'
import CheckBox from '@react-native-community/checkbox'
import {
  Dimensions,
  Switch
} from 'react-native'
import {
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Row,
  Subtitle,
  Icon,
  Image,
  View,
  Button,
  Text,
  TouchableOpacity,
  Divider
} from '@shoutem/ui'

import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

const { height } = Dimensions.get('window')
class OrderHistoryScreen extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)

    this.state = {
      orderCount: 0,
      orderPrice: 0,
      orderList: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetCartList()
    this.getUserInfo()
  }
  /*

    const params = {
      params: {
        user_info: true,
        filter_info: true,
        tag_info: true,
        like_info: true
      }
    }
    const res = await axios.get('/posts/' + postId, params)
     */

  ongetCartList(){
    const params = {
      params: {
        state :"purchased"
      }
    }
    axios.get('/orders', params).then((res)=>{
      console.log(res.data)
      this.setState({
        orderList:res.data
      })
    })
  }
  toggleCheckbox = async(id)=> {
    console.log("select: " + id)
    this.setState({ checked: !this.state.checked})
    const res = await axios.put('/line_filters/'+id)
    await this.setState({ orderPrice: res.data.order_info.total })
    this.ongetCartList()
  }
  onPressRemove = async(id) =>{
    console.log("remove")
    await axios.delete('/line_filters/'+id).then((res)=>{
      console.log(res.data)
    })
    this.ongetCartList()
  }
  renderRow(order) {
    return (
      <View style={{ backgroundColor: 'gray'}}>
        <Row
          style ={{ backgroundColor: '#1E1E1E'}}>
          <Image
            style={{ height: height * 0.12, width: height * 0.12 }}
            source={{uri: "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg"}}
          />
          <View styleName="vertical stretch">
            <Subtitle style={{
              color: 'white',
              marginBottom: 0
            }}>필터ID: {order.id}</Subtitle>
            <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>금액: {order.total} 원</Subtitle>
            <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>구매일: {order.purchased_at}</Subtitle>
          </View>
        </Row>
        <Divider styleName="line" />
      </View>
    )
  }
  onClickShopping = () => {
    this.props.navigation.navigate("Mypage")
  }

  getUserInfo = async () => {
    const userInfo = await axios.get('/users/my')
    await this.setState({
      userCash: userInfo.data.cash
    })
  }

  render() {
    return (
      <Screen styleName='fill-parent'
        style={{ backgroundColor: 'gray'}}>
        <ImageBackground
          source={require("../../assets/image/Header.jpg")}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'My Order'} topMargin={50} />
            }
          />
        </ImageBackground>
        <Row styleName="small" style={{ backgroundColor: '#1E1E1E'}}>
          <Image
            source={ require('../../assets/image/cash.png' )}
            style={{ width: 18, height: 18, color :'white', marginRight : 5 }}
          />
          <Text style={{color: 'white', marginLeft: 5}}>{this.state.userCash} 원</Text>
          <TouchableOpacity onPress={() => {this.getUserInfo()}}>
            <Image
              source={ require('../../assets/image/refresh.png' )}
              style={{ width: 18, height: 18, color :'white', marginRight : 5 }}
            />
          </TouchableOpacity>
        </Row>
        <Divider styleName="line" />
        <ListView
          data={this.state.orderList}
          renderRow={this.renderRow}
        />
      </Screen >
    )
  }
}

export default OrderHistoryScreen
