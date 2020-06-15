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
  ListView,
  Icon
} from '@shoutem/ui'
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
      filterList: [
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
      console.log(res.data.id)
    })
  }

  renderRow = (purchase) =>{
   return (
     <View style={{ backgroundColor: 'gray'}}>
       <Divider styleName="line" />
       <Row style ={{ backgroundColor: '#1E1E1E'}}>
            <Image
              source={ require('../../assets/image/money.png' )}
              style={{ width: 18, height: 18, color :'white', marginRight : 20 }}
            />
            <View styleName="vertical">
              <Subtitle style={{color: 'white'}}>주문번호: {purchase.id}</Subtitle>
              <Text numberOfLines={1} style={{color: 'white'}}>결제금액: {purchase.total}</Text>
              <Text numberOfLines={1} style={{color: 'white'}}>결제일자: {purchase.purchased_at}</Text>
            </View>
            <Icon styleName="disclosure" style={{color: 'white'}} name="right-arrow" />
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
               <Title title={'Purchase List'} topMargin={50} />
             }
           />
         </ImageBackground>
         <Divider styleName="line" />
         {(this.state.purchaseList&&this.state.purchaseList.length) ?
           (
             <ListView
               data={this.state.purchaseList}
               renderRow={this.renderRow}
             />)
           :
           (<View style ={{
             alignItems: "center",
             marginTop: 80}}>
             <Text style ={{color:'white'}}>구매내역이 없습니다.</Text>
           </View>
           )
         }

       </Screen >
     )
   }
}
export default Purchase
