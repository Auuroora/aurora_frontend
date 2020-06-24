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
class Like extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      LikeList: [
      ],
      userCash: null,
      checked:false,
    }
    this.ongetLikeList()
  }
  ongetLikeList(){
    const params = {
      params: {
        user_info: true,
        filter_info: true
      }
    }
    axios.get('/mylikes',params).then((res)=>{
      this.setState({
        LikeList:res.data
      })
    })
  }
  
  onClickCart = async(filterId, postId, price) => {
    const data = {
      line_filter: {
        filter_id : filterId,
        post_id: postId,
        amount : price
      }
    }
    await axios.post('/line_filters', data)
      .then((res) =>{
        alert("장바구니에 담았습니다")
      })
      .catch((err) => {
        alert("Failed to Add bucket : ", err)
      })
  }
   renderRow = (like) =>{
     return (
       <View style={{ backgroundColor: 'gray'}}>
         <Row
           style ={{ backgroundColor: '#1E1E1E'}}>
           <Image
             style={{ height: height * 0.12, width: height * 0.12 }} 
             source={{uri: AWS_S3_STORAGE_URL + like.filter_info.filter_name}}
           />
           <View styleName="vertical stretch">
             <Subtitle style={{
               color: 'white',
               marginBottom: 0
             }}>{like.post_info.title}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 14}}>{like.user_info.username}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 14}}>금액 : {like.post_info.price}원</Subtitle>
           </View>
           <TouchableOpacity onPress={() => {this.onClickCart(like.filter_info.id, like.post_info.id, like.post_info.price)}}>
             <Image
               source={ require('../../assets/image/add-to-cart.png' )}
               style={{ width: 22, height: 22, color :'white', marginRight : 10 }}
             />
           </TouchableOpacity>
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
               <Title title={'관심 내역'} topMargin={50} />
             }
           />
         </ImageBackground>   
         <Divider styleName="line" />
         {(this.state.LikeList&&this.state.LikeList.length) ?
           (
             <ListView
               data={this.state.LikeList}
               renderRow={this.renderRow}
             />)
           :
           (<View style ={{ 
             alignItems: "center",
             marginTop: 80}}>
             <Text style ={{color:'white'}}>관심내역이 없습니다.</Text>
           </View>
           )
         }
       </Screen >
     )
   }
}
export default Like
