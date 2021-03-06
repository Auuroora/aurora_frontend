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
class OrderScreen extends Component {
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

  ongetCartList =async() =>{
    const data = await axios.get('/line_filters')
    await this.setState({
      orderList:data.data,
      orderPrice:data.data[0].order_info.total
    })
  }
  toggleCheckbox = async(id)=> {
    this.setState({ checked: !this.state.checked})
    const res = await axios.put('/line_filters/'+id)
    await this.setState({ orderPrice: res.data.order_info.total })
    this.ongetCartList()
  }
  onPressRemove = async(id) =>{
    await axios.delete('/line_filters/'+id)
    this.ongetCartList()
  }
  renderRow(order) {
    return (
      <View style={{ backgroundColor: 'gray'}}>
        <Row
          style ={{ backgroundColor: '#1E1E1E'}}>
          <Image
            style={{ height: height * 0.12, width: height * 0.12 }}
            source={{uri: AWS_S3_STORAGE_URL + order.filter_info.filter_name}}
          />
          <View styleName="vertical stretch">
            <Subtitle style={{
              color: 'white',
              marginBottom: 0
            }}>필터명: {order.post_info.post_title}</Subtitle>
            <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>금액: {order.line_filter_info.amount} 원</Subtitle>
            <View styleName="horizontal">
              <Button
                onPress={()=>this.onPressRemove(order.line_filter_info.id)}
                style ={{ bolderColor: '#1E1E1E', backgroundColor: '#1E1E1E',  marginRight: 15 }}>
                <Text style={{ color: 'white', marginTop: 10, marginBottom:10, arginRight: 15 }}>
                  삭제
                </Text>
              </Button>
            </View>
          </View>
          <CheckBox
            label=""
            boxType="square"
            tintColor={"white"}
            onTintColor={"white"}
            onCheckColor={"white"}
            style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}}
            value={order.line_filter_info.check}
            checked={order.line_filter_info.check}
            onValueChange={() => this.toggleCheckbox(order.line_filter_info.id)}/>
        </Row>
        <Divider styleName="line" />
      </View>
    )
  }
  onClickShopping = () => {
    this.props.navigation.navigate("Home")
  }

  onClickPayment = async() => {
    var cash = this.state.userCash

    if (Number(this.state.orderPrice) === 0){
      alert("선택하신 상품이 없습니다.")
    }
    else if (cash >= this.state.orderPrice){
      await axios.post('/orders')
      alert("결제가 완료되었습니다!")
      this.props.navigation.navigate("Studio")
    }
    else{
      alert("잔액:"+cash+" 잔액이 부족합니다. 충전 페이지로 이동합니다!.")
      this.props.navigation.navigate("Payment")
    }
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
        style={{ backgroundColor: '#0A0A0A'}}>
        <ImageBackground
          source={require("../../assets/image/Header.jpg")}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'장바구니'} topMargin={50} />
            }
          />
        </ImageBackground>
        <View style={{height:80}}>
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
        </View>
        <Divider styleName="line" />
        <ListView
          data={this.state.orderList}
          renderRow={this.renderRow}
        />
        <Button
          onPress={() => this.onClickShopping()}
          style={{
            backgroundColor: '#1E1E1E',
            height: 50,
            marginHorizontal: 5,
            marginTop: 2,
            marginBottom: 2,
          }}>
          <Icon style={{ color: 'white'}} name="plus-button" />
          <Text
            style={{ color: 'white', fontWeight: "bold" }}>
            더 담으러 가기
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: '#1E1E1E',
            height: 50,
            marginHorizontal: 5,
            marginTop: 2,
            marginBottom: 2,
          }}
          onPress={() => {
            this.onClickPayment()
          }}
        >
          <Subtitle style={{
            color: 'white'
          }}>  {this.state.orderPrice}원 결제하기</Subtitle>
        </Button>
      </Screen >
    )
  }
}

export default OrderScreen