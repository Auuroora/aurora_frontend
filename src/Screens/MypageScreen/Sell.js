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
class Sell extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      sellList: [],
      // sellList: [{"comment_info": {"comments_count": 1}, "current_user_info": {"case": 800, "id": 2, "name": "김지환"}, "filter_info": {"filter_data_path": "1590407671236/68dee2b9-0cc8-2437-5e6b-501682523ca1.json", "filter_name": "1590407671236/68dee2b9-0cc8-2437-5e6b-501682523ca1.jpg", "id": 42}, "like_info": null, "post_info": {"created_at": "2020-05-25 12:09", "description": "New Filter asdfasdf", "id": 24, "price": 2000, "title": "my filter!"}, "tag_info": null, "user_info": {"created_at": "2020-04-30 11:38", "email": "asdf@asdf.com", "id": 2, "username": "김지환"}}],
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
             source={{uri: AWS_S3_STORAGE_URL +sell.filter_info.filter_name}}
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
         style={{ backgroundColor: '#1E1E1E', flex:1}}>
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
         {(this.state.sellList&&this.state.sellList.length) ?
           (
             <ListView
               data={this.state.sellList}
               renderRow={this.renderRow}
             />)
           :
           (<View style ={{ 
             alignItems: "center",
             marginTop: 80}}>
             <Text style ={{color:'white'}}>판매내역이 없습니다.</Text>
           </View>
           )
         }
       </Screen >
     )
   }
}
export default Sell
