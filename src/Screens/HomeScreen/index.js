import React, { Component } from "react"
import { Dimensions, StyleSheet, Platform } from "react-native"

import {
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
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
      groupedData: null
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = async () => {
    this.getPostList(1)
      .then((res) => {
        this.setState({
          postList: res.posts,
          isLoading: false
        })
        const groupedData = GridRow.groupByRows(this.state.postList, 2, () => {
          return 1
        })
        this.setState({
          groupedData: groupedData
        })
      })
      .catch(e => {
        console.log(e)
        alert('error : ' + e)
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
    if (this.state.isLoading) return
    await this.setState({
      pageNum: this.state.pageNum + 1,
      isLoading: true,
    })
    const res = await this.getPostList(this.state.pageNum)
    this.state.postList.concat(res.posts)

    await this.setState({
      isLoading: false,
    })
  }

  onClickLike = async(postid) => {
    const data = {
      liker:"user",
      likeable:"post",
      likeable_id :postid
    }
    await axios.post('/likes', data)
    this.componentDidMount()
    // 로직 새로 구성할것
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
          likedCount = {post.like_info.liked_count}
          commentCount = {post.comment_info.comments_count}
          liked = {post.like_info.liked}
          onClickLike = {this.onClickLike}
        />
      )
    })
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
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
        <ListView
          style={{
            height: height,
            width: width,
            listContent: {
              backgroundColor: '#0A0A0A',
            }
          }}
          data={this.state.groupedData}
          onRefresh={() => this.onRefresh()}
          renderRow={this.renderRow}
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