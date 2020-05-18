/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
  StatusBar
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
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      posts: [],
      isLoading: true,
      user: null
    }
    this.getPost()
    this.getUser()
  }
  getPost = async () => {
    const params = {
      params: {
        filter_info: true
      }
    }
    const postData = await axios.get('/mypost', params)
    await this.setState({posts: postData.data})
    await this.setState({isLoading: false})
  }

  getUser = async () => {
    const userData = await axios.get('/users')
    await this.setState({user: userData.data})
    console.log(this.state.user)
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
    // groupByRows(data, column number, grouping number)
    const groupedData = GridRow.groupByRows(this.state.posts, 2, 
      () => {
        return 1
      })
    return (
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content"/>
        <NavigationBar
          styleName='inline'
          centerComponent={<Title title={'MyPage'}/>}
        />
        <View style={styles.profile_container}>
          <Profile navigation={this.props.navigation}></Profile>
        </View>
        {this.state.isLoading ? (
          <Spinner styleName='large'/>
        ) : (
          <View style={styles.card_container}>
            <ListView
              data={groupedData}
              renderRow={this.renderRow}
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