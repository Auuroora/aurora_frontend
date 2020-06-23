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

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

const { height } = Dimensions.get('window')
class MoreOrderList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      moreOrder: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetOrderList(this.props.route.params.purchaseId)
  }
  ongetOrderList = async(purchaseId) =>{
    const data= await axios.get('/orders/'+purchaseId)
    await this.setState({moreOrder: data.data})
  }
   renderRow = (item) =>{
     return (
       <View style={{ backgroundColor: 'gray'}}>
         <Row
           style ={{ backgroundColor: '#1E1E1E'}}>
           <Image
             style={{ height: height * 0.12, width: height * 0.12 }} 
             source={{uri: AWS_S3_STORAGE_URL + item.filter_info.filter_name}}
           />
           <View styleName="vertical stretch">
             <Subtitle style={{
               color: 'white',
               marginBottom: 0
             }}>{item.post_info.title}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 16}}>{item.post_info.post_title}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 14}}>금액 : {item.line_filter_info.amount}원</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 14}}>시간 : {item.line_filter_info.created_at}</Subtitle>
           </View>
         </Row>
         <Divider styleName="line" />
       </View>
     )
   }

   render() {
     return (
       <Screen 
         style={{ backgroundColor: '#1E1E1E', flex:1}}>
         <ImageBackground
           source={require("../../assets/image/Header.jpg")}
           styleName="large-ultra-wide"
         >
           <NavigationBar
             styleName="clear"
             centerComponent={
               <Title title={'구매 내역'} topMargin={50} />
             }
           />
         </ImageBackground>   
         <Divider styleName="line" />
         <ListView
           data={this.state.moreOrder}
           renderRow={this.renderRow}
         />
       </Screen >
     )
   }
}
export default MoreOrderList
