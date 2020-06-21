import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import {
  NavigationBar,
  ImageBackground,
  Screen,
  Image,
  View,
  Text,
  Row,
  Subtitle,
  Divider,
  TouchableOpacity,
  ListView
} from '@shoutem/ui'
import MyOrderTab from './myOrderTab'
import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

const { height } = Dimensions.get('window')
class Purchase extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      purchaseList: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetPurchaseList()
  }
  ongetPurchaseList(){
    const params = {
      params: {
        state :"purchased"
      }
    }
    axios.get('/orders', params).then((res)=>{
      console.log(res.data)
      this.setState({
        purchaseList:res.data
      })
    })
  }
   renderRow = (purchase) =>{
     return (
       <View style={{ backgroundColor: 'gray'}}>
         <Row
           style ={{ backgroundColor: '#1E1E1E'}}>
           <Image
             style={{ height: height * 0.12, width: height * 0.12 }}
             source={{uri:  AWS_S3_STORAGE_URL + purchase.filter_info.filter_name}}
           />
           <View styleName="vertical stretch">
             <Subtitle style={{
               color: 'white',
               marginBottom: 0
             }}>필터ID: {purchase.id}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>금액: {purchase.total} 원</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>구매일: {purchase.purchased_at}</Subtitle>
           </View>
         </Row>
         <Divider styleName="line" />
       </View>
     )
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
               <Title title={'Purhcase List'} topMargin={50} />
             }
           />
         </ImageBackground>   
         <Divider styleName="line" />
         <ListView
           data={this.state.purchaseList}
           renderRow={this.renderRow}
         />
       </Screen >
     )
   }
}
export default Purchase
