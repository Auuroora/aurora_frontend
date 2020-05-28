import React, { Component } from 'react'
import {
  Dimensions,
  CheckBox
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
      orderPrice: 2000,
      orderList: [
      ],
    }
    this.ongetCartList()
  }

  ongetCartList(){
    axios.get('/line_filters').then((res)=>{
      console.log(res.data)
      this.setState({orderList:res.data})
    })
  }
  renderRow(orderList) {
    return (
      <View styleName="stretch" style={{ marginHorizontal: 1, marginTop: 5, borderRadius: 2 }}>
        <Row>
          <Image
            style={{ height: height * 0.15, width: height * 0.15 }}
            source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle>{orderList.filter_id}</Subtitle>
            <Subtitle>{orderList.amount}</Subtitle>
          </View>
          <Button onPress={this.props.onPressRemove}>
            <Text style={{ color: '#0395FF', marginTop: 40, marginRight: 15 }}
            >
              삭제
            </Text>
          </Button>
          <CheckBox
            center
            title='Click Here'
            value = { this.state.check }
            onChange = {() => this.checkBox_Test(item)}
          />
        </Row>
      </View>
    )
  }
  onClickShopping = () => {
    this.props.navigation.navigate("Shopping")
  }

  onClickPayment = () => {
    var userMoney =Math.random()*4000
    userMoney=Math.floor(userMoney)
    if (userMoney>=this.state.orderPrice){
      alert("잔액:"+userMoney+" 잔액이 충분하군요! 결제 완료!")
    }
    else{
      alert("잔액:"+userMoney+" 잔액이 부족합니다! 충전 페이지로 넘어갑니다.")
      this.props.navigation.navigate("Payment")
    }
  }
  
  render() {
    return (
      <Screen styleName='fill-parent'>
        <ImageBackground
          source={require("../../assets/image/Header.jpg")}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'Order'} topMargin={50} />
            }
          />
        </ImageBackground>
        <ListView
          data={this.state.orderList}
          renderRow={this.renderRow}
        />
        <Divider styleName="line" />
        <Button
          onPress={() => this.onClickShopping()}>
          <Icon style={{ color: '#FF6787' }} name="plus-button" />
          <Text
            style={{ color: '#FF6787', fontWeight: "bold" }}>
            더 담으러 가기
          </Text>
        </Button>
        <Button styleName="clear"
          style={{
            backgroundColor: '#FF6787',
            height: 50,
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            this.onClickPayment()
          }}
        >
          <View style={{
            width: 25,
            height: 25,
            borderRadius: 12.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 15,
              fontColor: 'black'
            }}>{this.state.orderList.length}
            </Text>
          </View>
          <Subtitle>  {this.state.orderPrice}원 결제하기</Subtitle>
        </Button>
      </Screen >
    )
  }
}

export default OrderScreen