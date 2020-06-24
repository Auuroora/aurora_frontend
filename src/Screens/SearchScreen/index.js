import React, { Component } from "react"
import { Dimensions, StyleSheet, Platform } from "react-native"

import {
  NavigationBar,
  Screen,
  ListView,
  Button,
  GridRow,
  TextInput,
  Icon,
  View,
  DropDownMenu
} from '@shoutem/ui'

import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"


const { width, height } = Dimensions.get("window")
const topMargin = Platform.OS === "android" ? 10 : 25

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
      isLoading: true,
      pageNum: 1,
      groupedData: null,
      filters: [
        { name: "Title", value: "title_cont" },
        { name: "Tag", value: "tag_cont" },
        { name: "Description", value: "description_cont" },
      ],
      selectedFilter: this.props.route.params ? { name: "Tag", value: "tag_cont" } : null,
      keyword : this.props.route.params ? this.props.route.params.tagName : '',
      refresh : this.props.route.params ? this.props.route.params.refresh : false
    }
    this.onListTagSearch()
  }

  onListTagSearch = async () => {
    await this.setState({selectedFilter: this.state.filters[1]})

    if (this.state.refresh) {
      await this.onClickSearch()
      await this.setState({refresh: false,})
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

  onClickSearch = async () => {
    const params = {
      params: {                
        filter_info: true,
        like_info :true,
        comment_info: true
      },
    }
    const res = await axios.get("/posts?" + this.state.selectedFilter.value
    + '=' + this.state.keyword, params)

    await this.setState({
      postList: res.data.posts,
      isLoading: false
    })

    const groupedData = GridRow.groupByRows(this.state.postList, 2, () => {
      return 1
    })

    this.setState({
      groupedData: groupedData
    })
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

  render() {
    return (
      <Screen
        style={{
          backgroundColor: '#0A0A0A'
        }}
      >
        <NavigationBar
          styleName='inline clear'
          centerComponent={
            <Title title={this.props.route.params ? this.state.keyword : "Search"} topMargin={topMargin}/>
          }
        />
        {this.props.route.params ? (null) : (
          <View 
            style={{
              flexDirection:'row',
              justifyContent:'space-around',
              backgroundColor: '#FAFAFA'
            }}
          >
            <DropDownMenu
              options={this.state.filters}
              selectedOption={
                this.state.selectedFilter
                  ? this.state.selectedFilter
                  : this.state.filters[1]
              }
              onOptionSelected={(filter) =>{
                this.setState({ selectedFilter: filter })
              }}
              titleProperty="name"
              valueProperty="value"
            />
            <TextInput 
              placeholder={"keyword"}
              value={this.state.keyword}
              style={{flex:1}}
              onChangeText={(text) => this.setState({keyword: text})}
            />
            <Button onPress={this.onClickSearch}>
              <Icon name='search'/>
            </Button>
          </View>
        )}
        <ListView
          style={{
            height: height,
            width: width,
            listContent: {
              backgroundColor: '#0A0A0A',
            }
          }}
          data={this.state.groupedData}
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
