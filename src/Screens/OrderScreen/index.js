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
      checked:false,
    }
    this.ongetCartList()
  }

  ongetCartList(){
    axios.get('/line_filters').then((res)=>{
      console.log(res.data)
      this.setState({orderList:res.data})

    })
  }
  toggleCheckbox = async(filter_id)=> {
    console.log("select")
    console.log(filter_id)
    this.setState({ checked: !this.state.checked})
    await axios.put('/line_filters/'+filter_id).then((res)=>{
      console.log(res.data)
    })
  }
  onPressRemove = async(filter_id) =>{
    console.log("remove")
    await axios.delete('/line_filters/'+filter_id).then((res)=>{
      console.log(res.data)
    })
  }
  renderRow(orderList) {
    return (
      <View style={{ backgroundColor: 'gray'}}>
        <Row
          style ={{ backgroundColor: '#1E1E1E'}}>
          <Image
            style={{ height: height * 0.15, width: height * 0.15 }}
            source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle style={{
              color: 'white'
            }}>{orderList.filter_id}</Subtitle>
            <Subtitle style={{
              color: 'white'
            }}>{orderList.amount}</Subtitle>
          </View>
          <Button 
            onPress={()=>this.onPressRemove(orderList.filter_id)}  
            style ={{ bolderColor: '#1E1E1E', backgroundColor: '#1E1E1E', height:30,  marginRight: 15 }}>
            <Text style={{ color: 'white', marginTop: 10, marginRight: 15 }}
            >
              삭제
            </Text>
          </Button>
          <CheckBox
            style={{backgroundColor:'#1E1E1E'}}
            value={this.state.checked}
            onChange={() => this.toggleCheckbox(orderList.filter_id)}/>
        </Row>
        <Divider styleName="line" />
      </View>
    )
  }
  onClickShopping = () => {
    this.props.navigation.navigate("Home")
  }

  onClickPayment = async() => {
    const userData = await axios.get('/user/my')
    var userMoney = userData.data.cash

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
      <Screen styleName='fill-parent'
        style={{ backgroundColor: 'gray'}}>
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
              fontColor: 'white'
            }}>{this.state.orderList.length}
            </Text>
          </View>
          <Subtitle style={{
            color: 'white'
          }}>  {this.state.orderPrice}원 결제하기</Subtitle>
        </Button>
      </Screen >
    )
  }
}

export default OrderScreen