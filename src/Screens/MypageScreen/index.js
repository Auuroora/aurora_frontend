/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet
} from 'react-native'

import Profile from './Profile'
import { 
  ListView,
  GridRow,
  Screen,
  NavigationBar,
  View,
  Spinner
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
      userPostCount: null
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
      isLoading: false
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
    flex: 2,
  },
  card_container:{
    flex: 4,
  },
})

export default MypageScreen