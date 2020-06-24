/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Profile from './Profile'
import {
  ListView,
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

import {AWS_S3_STORAGE_URL} from 'react-native-dotenv'
import axios from '../../axiosConfig'

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
        { img : require('../../assets/image/add-to-cart.png' ),
          set : "장바구니",
          navigateScreen: "Order"
        },
        {
          img :  require('../../assets/image/sell.png' ),
          set : "구매 내역",
          navigateScreen: "PurchaseStack"
        },
        {
          img : require('../../assets/image/bill.png' ),
          set : "판매 내역",
          navigateScreen: "Sell"
        },
        {
          img :  require('../../assets/image/heart_red.png' ),
          set : "관심 내역",
          navigateScreen: "Like"
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
      userPostCount: postData.data.length,
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
              source={ setItem.img }
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
    console.log(this.state.user)
    await this.setState({
      user: userData.data,
      userCash: userData.data.cash
    })
  }
  render(){
    return (
      <Screen styleName='fill-parent'
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <NavigationBar
          styleName='inline clear'
          centerComponent={<Title title={'MyPage'}/>}
        />
        {this.state.isLoading ? (
          <Spinner styleName='large'/>
        ) : (
          <View style={styles.profile_container}>
            <Profile
              navigation={this.props.navigation}
              postCount={this.state.userPostCount}
              cash={this.state.user.cash}
              email={this.state.user.email}
              username={this.state.user.username}
              profile={this.state.user.image ? { uri: AWS_S3_STORAGE_URL + this.state.user.image } : require('../../assets/image/user.png')}
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
