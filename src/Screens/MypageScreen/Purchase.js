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
      // purchaseList: [{"comment_info": {"comments_count": 1}, "current_user_info": {"case": 800, "id": 2, "name": "김지환"}, "filter_info": {"filter_data_path": "1590407671236/68dee2b9-0cc8-2437-5e6b-501682523ca1.json", "filter_name": "1590407671236/68dee2b9-0cc8-2437-5e6b-501682523ca1.jpg", "id": 42}, "like_info": null, "post_info": {"created_at": "2020-05-25 12:09", "description": "New Filter asdfasdf", "id": 24, "price": 2000, "title": "my filter!"}, "tag_info": null, "user_info": {"created_at": "2020-04-30 11:38", "email": "asdf@asdf.com", "id": 2, "username": "김지환"}}],
    
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
