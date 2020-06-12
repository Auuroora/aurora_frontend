/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import Profile from './Profile'
import { 
  ListView,
  GridRow,
  Screen,
  NavigationBar,
  View,
  Subtitle,
  Spinner,
  Image,
  Row,
  Divider
} from '@shoutem/ui'
import Title from '../../Components/Title'
import CardItem from '../../Components/CardItem'

import {AWS_S3_STORAGE_URL} from 'react-native-dotenv'
import axios from '../../axiosConfig'
const { height } = Dimensions.get('window')

class MypageScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      isLoading: true,
      user: null,
      userPostCount: null,
      userCash: null,
      setting: [
        {
          img :  require('../../assets/image/money.png' ),
          set : "환급 절차",
          navigateScreen: "OrderHistory"
        },
        {
          img :  require('../../assets/image/sell.png' ),
          set : "구매 내역",
          navigateScreen: "Purchase"
        },
        {
          img : require('../../assets/image/bill.png' ),
          set : "판매 내역",
          navigateScreen: "Sell"
        },
        {
          img :  require('../../assets/image/heart_red.png' ),
          set : "관심 내역",
          navigateScreen: "OrderHistory"
        },
        {
          img :  require('../../assets/image/settings.png' ),
          set : "설정",
          navigateScreen: "Settingstack"
        }
      ]
    }
    this.getMypageInfo()
  }

  getMypageInfo = async () => {
    const params = {
      params: {
        filter_info: true
      }
    }
    const postData = await axios.get('/mypost', params)
    const userData = await axios.get('/user/my')
    
    await this.setState({
      posts: postData.data,
      user: userData.data,
      userPostCount: this.state.posts.length,
      isLoading: false,
      userCash: userData.data.cash
    })
  }

  renderRow(setItem) {  
    return (
      <TouchableOpacity onPress={() => {this.props.navigation.navigate(setItem.navigateScreen)}}>
        <View style={{ backgroundColor: 'gray'}}>
          <Row
            style ={{ backgroundColor: '#1E1E1E'}}>
            <Image
              style={{ width: 20, height: 20, color :'white', marginRight :25 }}
              source={setItem.img}
            />
            <View styleName="vertical stretch">
              <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 10, fontSize: 17}}>{setItem.set}</Subtitle>
            </View>
          </Row>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    )
  }
  onRefresh = async() => {
    const userData = await axios.get('/user/my')
    await this.setState({
      user: userData.data,
      userCash: userData.data.cash
    })
  }
  render(){
    const groupedData = GridRow.groupByRows(this.state.posts, 2, () => {
      return 1
    })
    return (
      <Screen styleName='fill-parent'
        style={{backgroundColor: '#0A0A0A'}}
      >
        <NavigationBar
          styleName='inline clear'
          centerComponent={<Title title={'MyPage'}/>}
          rightComponent ={
            <View 
              styleName="horizontal space-between" 
              style={{ marginTop : 25 }}
            >
              <TouchableOpacity onPress={() => {this.props.navigation.navigate("OrderHistory")}}>
                <Subtitle 
                  style={{
                    fontSize: 14,
                    color: '#FFFFFF',
                    marginRight: 10,
                    paddingTop: 10
                  }}
                >
                  {'Cash: ' + this.state.userCash + ' 원'}
                </Subtitle>
              </TouchableOpacity>   
              <TouchableOpacity onPress={() => {this.onRefresh()}}>
                <Image
                  source={ require('../../assets/image/refresh.png' )}
                  style={{ width: 20, height: 20, color :'white', marginRight : 15 }}
                />
              </TouchableOpacity>
            </View>}
        />
        {this.state.isLoading ? (
          <Spinner styleName='large'/>
        ) : (
          <View style={styles.profile_container}>
            <Profile 
              navigation={this.props.navigation}
              postCount={this.state.userPostCount}
              follower={this.state.user.followers_count}
              followee={this.state.user.followees_count}
              username={this.state.user.username}
            />
          </View>
        )}
        {this.state.isLoading ? (
          <Spinner styleName='large'/>
        ) : (
          <View style={styles.card_container}>
            <Divider styleName="line" />
            <ListView
              style={{
                listContent: {
                  backgroundColor: '#0A0A0A'
                }
              }}
              data={this.state.setting}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
        )}
      </Screen>

    )
  }
}
const styles = StyleSheet.create({
  profile_container:{
    flex: 2,
  },
  card_container:{
    flex: 7,
  },
})

export default MypageScreen