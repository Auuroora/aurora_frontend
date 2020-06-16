import React, { Component } from 'react'
import { Dimensions,
  StyleSheet,
  Modal,
  TouchableHighlight
} from 'react-native'
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
  Button,
  Caption
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
      userCash: null,
      userSalesCount: null,
      modalVisible: false
    }
    this.onGetSellList()
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }
  onGetSellList(){
    axios.get('/histories').then((res)=>{
      console.log(res.data)
      this.setState({
        sellList:res.data,
        userCash:res.data[0].current_user_info.cash,
        userSalesCount:res.data[0].current_user_info.salse_count
      })
    })
  }
  onExchange = async(id, state) => {
    await axios.put('/histories/' + id + "?state=" + state).then((res) => {
      console.log(res.data)
    })
    this.onGetSellList()
  }

  renderNonExchanged = (id) => {
    return (
      <View styleName="horizontal">
        <Button
          onPress={()=> { this.onExchange(id, "returned_as_cash") }}
          style ={{ bolderColor: '#1E1E1E', backgroundColor: '#1E1E1E',  marginRight: 15 }}>
          <Text style={{ color: 'white', marginTop: 10, marginBottom:10, arginRight: 15 }}>
            캐쉬로 받기
          </Text>
        </Button>
        <Button
          onPress={()=> { this.onExchange(id, "exchange_request") }}
          style ={{ bolderColor: '#1E1E1E', backgroundColor: '#1E1E1E',  marginRight: 15 }}>
          <Text style={{ color: 'white', marginTop: 10, marginBottom:10, arginRight: 15 }}>
            환급 요청
          </Text>
        </Button>
      </View>
    )
  }

  renderExchanged = (state) => {
    return (
      <Button
        style ={{ borderColor: 'gray', backgroundColor: '#1E1E1E',  marginRight: 15 }}>
        <Text style={{ color: 'gray', marginTop: 10, marginBottom:10, arginRight: 15 }}> {state=="cashed" ? "캐쉬로 수령" : "환급 요청됨"}
        </Text>
      </Button>
    )
  };

   renderRow = (sell) =>{
     return (
       <View style={{ backgroundColor: 'gray'}}>
         <Row
           style ={{ backgroundColor: '#1E1E1E'}}>
           <Image
             style={{ height: height * 0.12, width: height * 0.12 }}
             source={{uri: AWS_S3_STORAGE_URL +sell.filter_info.filter_name}}
           />
           <View styleName="stretch">
             <Subtitle style={{
               color: 'white',
               marginBottom: 0
             }}>구매자: {sell.user_info.username} ({sell.user_info.email})</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginTop: 5, fontSize: 13}}>판매 금액: {sell.history_info.amount}</Subtitle>
             <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 8, fontSize: 13}}>판매일자: {sell.history_info.created_at}</Subtitle>
             <View styleName="horizontal stretch">
               {sell.history_info.state === "non_exchange" ? (
                 this.renderNonExchanged(sell.history_info.id)
               ) : (
                 this.renderExchanged(sell.history_info.state)
               )}
             </View>
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
               <Title title={'판매 내역'} topMargin={50} />
             }
           />
         </ImageBackground>
         <View style={{height:150}}>
           <Row styleName="small" style={styles.noticeRow}>
             <View styleName="vertical stretch" style={{alignItems:'center'}}>
               <Text style={styles.noticeTextTitle}>보유 캐쉬</Text>
               <Divider styleName="line" style={styles.noticeDivider} />
               <View styleName="horizontal">
                 <Image source={ require('../../assets/image/money.png' )} style={styles.noticeImage} />
                 <Text style={styles.noticeTextContent}>{ this.state.userCash }</Text>
               </View>
             </View>
             <View styleName="vertical stretch" style={{alignItems:'center'}}>
               <Text style={styles.noticeTextTitle}>판매한 상품 수</Text>
               <Divider styleName="line" style={styles.noticeDivider}/>
               <View styleName="horizontal">
                 <Image source={ require('../../assets/image/sell.png' )} style={styles.noticeImage} />
                 <Text style={styles.noticeTextContent}>{ this.state.userSalesCount }</Text>
               </View>
             </View>
           </Row>
         </View>
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
       </Screen>
     )
   }
}

const styles = StyleSheet.create({
  noticeRow: {
    borderColor: 'white',
    backgroundColor:'#1E1E1E',
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 20,
    padding: 10,
    justifyContent: 'space-between'
  },
  noticeDivider: {
    marginLeft: 20,
    marginRight: 20
  },
  noticeImage: {
    width: 18,
    height: 18,
    color :'white',
    marginRight : 7
  },
  noticeTextTitle: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  noticeTextContent: {
    color: 'white',
    marginTop:10
  }
})

export default Sell
