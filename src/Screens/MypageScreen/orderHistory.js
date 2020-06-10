import React, { Component } from 'react'
import {
  NavigationBar,
  ImageBackground,
  Screen,
  Image,
  View,
  Text,
  TouchableOpacity,
} from '@shoutem/ui'
import MyOrderTab from './myOrderTab'
import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

class OrderHistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderPrice: 0,
      orderList: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetOrderList()
    this.getUserInfo()
  }
  ongetOrderList(){
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
  getUserInfo = async () => {
    const userInfo = await axios.get('/users/my')
    await this.setState({
      userCash: userInfo.data.cash
    })
  }

  render() {
    return (
      <Screen 
        style={{ backgroundColor: 'gray', flex:1}}>
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
        <MyOrderTab 
          style={{flex :3, backgroundColor: '#1E1E1E'}}
          orderList = {this.state.orderList}/>     
        <View style={{height:40, flexDirection:'row',justifyContent:"flex-end",backgroundColor: '#1E1E1E'}}>
          <Image
            source={ require('../../assets/image/cash.png' )}
            style={{ width: 18, height: 18, color :'white', marginRight : 5 }}
          />
          <Text style={{color: 'white', marginLeft: 5}}>{this.state.userCash} 원</Text>
          <TouchableOpacity 
            onPress={() => {this.getUserInfo()}}>
            <Image
              source={ require('../../assets/image/refresh.png' )}
              style={{ width: 18, height: 18, color :'white',  marginLeft: 35 ,marginRight : 5}}
            />
          </TouchableOpacity>
        </View>
      </Screen >
    )
  }
}
export default OrderHistoryScreen
