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
class Sell extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      sellList: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetsellList()
  }
  ongetsellList(){ 
    // 판매내역 불러오기
    // const params = {
    //   params: {
    //     state :"purchased"
    //   }
    // }
    // axios.get('/orders', params).then((res)=>{
    //   console.log(res.data)
    //   this.setState({
    //     sellList:res.data
    //   })
    // })
  }
   renderRow = (sell) =>{
     return (
       <View style={{ backgroundColor: 'gray'}}>
         <Row
           style ={{ backgroundColor: '#1E1E1E'}}>
           <Image
             style={{ height: height * 0.12, width: height * 0.12 }}
             source={{uri: AWS_S3_STORAGE_URL + this.state.filter_info.filter_name}}
           />
           <View styleName="vertical stretch">
             <Subtitle style={{
               color: 'white',
               marginBottom: 0
             }}>필터ID: {sell.id}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>금액: {sell.total} 원</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>구매일: {sell.purchased_at}</Subtitle>
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
               <Title title={'Sell List'} topMargin={50} />
             }
           />
         </ImageBackground>   
         <Divider styleName="line" />
         <ListView
           data={this.state.sellList}
           renderRow={this.renderRow}
         />
       </Screen >
     )
   }
}
export default Sell
