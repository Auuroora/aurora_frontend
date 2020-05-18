import React, {Component} from 'react'
import {
  StatusBar,
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Button,
  Icon,
  GridRow
} from '@shoutem/ui'
import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import {AWS_S3_STORAGE_URL} from 'react-native-dotenv'
import axios from '../../axiosConfig'

/* TODO
 * 1. Add SearchBar and icon to Navigation
 * 2. Add Sort and icon to Navigation
 */

class HomeScreen extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      postList: []
    }
    this.getPostList()
  }

  getPostList = async () => {
    const params = {
      params: {
        filter_info: true
      }
    }
    const res = await axios.get('/posts', params)
    await this.setState({postList: res.data})
    return res.data
  }

  renderRow = (rowData) => {  
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
  onClickShopping = () =>{
    this.props.navigation.navigate("Shopping")
  }
  render(){
    // groupByRows(data, column number, grouping number)
    const groupedData = GridRow.groupByRows(this.state.postList, 2, 
      () => {
        return 1
      })
    return (
      //TODO: 무한 스크롤 적용해야함 
      //TODO: Component 로 뽑아내기
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content" hidden = {true}/>
        <ImageBackground
          source={require('../../assets/image/Header.jpg')}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'Home'} topMargin={50}/>
            }
            rightComponent={
              <Button onPress={() => {this.onClickShopping()}}>
                <Icon name="cart" style ={{color  :"white"}}/>
              </Button>
            }
          />
        </ImageBackground>
        <ListView
          styleName='inline'
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}

export default HomeScreen