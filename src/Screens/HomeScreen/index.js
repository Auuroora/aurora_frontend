import React, { Component } from "react"
import { Dimensions, StyleSheet, Platform, FlatList } from "react-native"

import {
  NavigationBar,
  ImageBackground,
  Screen,
  Button,
  Icon,
  GridRow,
  View
} from '@shoutem/ui'

import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"


const { width, height } = Dimensions.get("window")
const topMargin = Platform.OS === "android" ? 25 : 50

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      isLoading: true,
      pageNum: 1,
      groupedData: null,
      refresh: false,
      onNavigateRefresh: props.route.params ? props.route.params.refresh : false
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = async () => {
    const res = await this.getPostList(1)
    await this.setState({
      postList: res.posts,
      pageNum: 1,
      isLoading: false
    })

    const groupedData = GridRow.groupByRows(this.state.postList, 2, () => {
      return 1
    })

    await this.setState({
      groupedData: groupedData
    })
     
  }

  getPostList = async (page) => {
    const params = {
      params: {
        filter_info: true,
        like_info :true,
        comment_info: true
      },
    }
    const res = await axios.get("/posts?page=" + page, params)
    return res.data
  }

  loadMore = async () => {
    if (!this.state.isLoading) {
      await this.setState({
        pageNum: this.state.pageNum + 1,
        isLoading: true,
      })
      const res = await this.getPostList(this.state.pageNum)

      await this.setState({
        isLoading: false,
        postList: this.state.postList.concat(res.posts)
      })
    }
  }

  onClickLike = async(postid) => {
    const data = {
      liker:"user",
      likeable:"post",
      likeable_id :postid
    }
    await axios.post('/likes', data)
    this.componentDidMount()
  }
  
  renderRow = ({ item, index }) => {  
    return (
      <CardItem
        navigation={this.props.navigation}
        postId={item.post_info.id}
        key={index}
        image={AWS_S3_STORAGE_URL + item.filter_info.filter_name}
        title={item.post_info.title}
        price={item.post_info.price}
        likedCount = {item.like_info.liked_count}
        commentCount = {item.comment_info.comments_count}
        liked = {item.like_info.liked}
        onClickLike = {this.onClickLike}
      />
      
    )
  }

  onClickShopping = () => {
    this.props.navigation.navigate("Order")
  }

  render() {
    return (
      <Screen
        style={{
          backgroundColor: '#0A0A0A'
        }}
      >
        <ImageBackground
          source={require("../../assets/image/Header.jpg")}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={"Home"} topMargin={topMargin}/>
            }
            rightComponent={
              <View 
                styleName="horizontal space-between"
                style={styles.headerContents}
              >
                <Button
                  styleName="clear"
                  onPress={this.onClickShopping}
                >
                  <Icon name="cart" style={styles.headerIcon} />
                </Button>
              </View>
            }
          />
        </ImageBackground>
        <FlatList
          style={{
            height: height,
            width: width,
            padding: 5
          }}
          data={this.state.postList}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
          extraData={this.state}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.001}
          numColumns={2}
          renderItem={this.renderRow}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  headerContents: {
    marginTop: topMargin + 10,
    marginLeft: 10,
    marginRight: 10
  },
  headerIcon: {
    margin: 0,
    color: '#FAFAFA',
    fontSize: 25
  }
})
