import React, { Component } from "react"
import { Dimensions } from "react-native"

import {
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Button,
  Icon,
  GridRow,
  DropDownMenu,
  View
} from '@shoutem/ui'
import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

/* TODO
 * 1. Add SearchBar and icon to Navigation
 * 2. Add Sort and icon to Navigation
 */

const { width, height } = Dimensions.get("window")

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      filters: [
        { name: "Title", value: "Title" },
        { name: "Tag", value: "Tag" },
        { name: "Price", value: "Price" },
      ],
      isLoading: true,
      pageNum: 1
    }
  }

  componentDidMount() {
    this.getPostList(1)
      .then((res) => {
        this.setState({
          postList: res.posts,
          isLoading: false
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
    console.log(postid)
    const data = {
      liker:"user",
      likeable:"post",
      likeable_id :postid
    }
    await axios.post('/likes', data)
    this.componentDidMount()
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
    this.props.navigation.navigate("Shopping")
  }

  render() {

    const groupedData = GridRow.groupByRows(this.state.postList, 2, () => {
      return 1
    })

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
            leftComponent={
              <DropDownMenu
                options={this.state.filters}
                style={{
                  selectedOption: {
                    "shoutem.ui.Text": {
                      color: "#ffffff",
                      borderColor: "#ffffff",
                    },
                    "shoutem.ui.Icon": {
                      color: "#ffffff",
                    },
                  },
                }}
                selectedOption={
                  this.state.selectedFilter
                    ? this.state.selectedFilter
                    : this.state.filters[0]
                }
                onOptionSelected={(filter) =>
                  this.setState({ selectedFilter: filter })
                }
                titleProperty="name"
                valueProperty="value"
              />
            }
            centerComponent={<Title title={"Home"} topMargin={50} />}
            rightComponent={
              <View styleName="horizontal space-between">
                <Button styleName="clear" >
                  <Icon name="search" style ={{color  :"white"}}/>
                </Button>
                <Button
                  styleName="clear"
                  onPress={() => {
                    this.onClickShopping()
                  }}
                >
                  <Icon name="cart" style={{ color: "white" }} />
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
          data={groupedData}
          onRefresh={() => this.getPostList(1)}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}

export default HomeScreen