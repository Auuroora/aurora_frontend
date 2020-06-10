/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
  Button,
  TouchableOpacity
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
} from '@shoutem/ui'
import Title from '../../Components/Title'
import CardItem from '../../Components/CardItem'

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
      userCash: null
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

  renderRow(rowData) {  
    const cellViews = rowData.map((post, id) => {
      return (
        <CardItem
          navigation={this.props.navigation}
          key={id}
          postId={post.post_info.id}
          image={AWS_S3_STORAGE_URL + post.filter_info.filter_name} 
          title={post.post_info.title} 
          price={post.post_info.price}
        />
      )
    })
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
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
            <ListView
              style={{
                listContent: {
                  backgroundColor: '#0A0A0A'
                }
              }}
              data={groupedData}
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
    flex: 1,
  },
  card_container:{
    flex: 3,
  },
})

export default MypageScreen