/* eslint-disable react/prop-types */
import React, { Component} from 'react'

import {
  Dimensions,
  StyleSheet 
} from 'react-native'

// Import UI components
import {
  Image,
  Screen,
  NavigationBar,
  View,
  Card,
  ListView,
  Heading,
  Subtitle,
  Button,
  Text,
  Divider,
  ScrollView,
  Spinner,
  TextInput,
  TouchableOpacity,
} from '@shoutem/ui'

import Title from '../../Components/Title'
import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'
import Comment from './commentList'
import ImgToBase64 from 'react-native-image-base64'
import { loadImg, getWatermarkedImg } from '../../OpencvJs'
import { mapCvFunction } from '../../utils'
import Modal from "react-native-modal"
import DropDownPicker from 'react-native-dropdown-picker'

/*
Todo
1.Component화
 */
const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}
const { width } = Dimensions.get('window')


class DetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postId: props.route.params.postId,
      postData : null,
      isLoading: true,
      imageFile: [],
      isPreview: false,
      myComment: '',
      commentData:[],
      userData: '',
      visibleModal: false,
      reportData: '',
      reportKind: 'default',
      isMyPost:false
    }
    this.getPostInfo(this.state.postId)
    this.getCommentInfo(this.state.postId)
  }

  getPostInfo = async (postId) => {
    const params = {
      params: {
        user_info: true,
        filter_info: true,
        tag_info: true,
        like_info: true
      }
    }
    const res = await axios.get('/posts/' + postId, params)
    await this.setState({postData : res.data})
    await this.setState({userData : res.data.user_info})
    if(res.data.user_info.id === res.data.current_user_info.id){
      await this.setState({isMyPost :true})
      console.log(this.state.isMyPost)
    }
    this.setState({isLoading: false})
  }

  onClickPostImage = () => {
    this.setState({
      imageFile: [{
        source: { uri: AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_name},
        title: 'Image Preview',
        width: width,
      }],
      isPreview: true,
    })
  }

  onClickPreview = async () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      if (response.error) {
        return
      }

      await loadImg(response.data, response.width, response.height)

      const filter = await fetch(AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_data_path)
      const preset = await filter.json()

      let resultImg = null

      for (let key in preset) {
        const modifyFunc = mapCvFunction(key)
        try {
          resultImg = await modifyFunc(preset[key])
        } catch (e) {
          console.log(e)
        }
      }

      const res = await ImgToBase64.getBase64String(AWS_S3_STORAGE_URL + 'assets/watermark.png')
      const preview = await getWatermarkedImg(resultImg, res, response.width, response.height)

      this.setState({
        imageFile: [{
          source: { uri: 'data:image/jpeg;base64,' + preview},
          title: 'Image Preview',
          width: response.width,
          height: response.height,
        }],
        isPreview: true
      })
    })
  }

  onClickCart = async() => {
    const data = {
      line_filter: {
        filter_id : this.state.postData.filter_info.id,
        post_id: this.state.postData.post_info.id,
        amount : this.state.postData.post_info.price
      }
    }
    console.log(data)
    await axios.post('/line_filters', data)
      .then((res) =>{
        console.log(res.data)
        alert("장바구니에 담았습니다")
      })
      .catch((err) => {
        alert("Failed to Add bucket : ", err)
      })
  }

  getCommentInfo = async (postId) => {
    const params = {
      params: {
        commentable_type : "Post",
        commentable_id :postId
      }
    }
    const res = await axios.get('/comments', params)
    await this.setState({commentData : res.data})
  }

  postCommentInfo = async () => {
    const data = {
      comment: {
        commentable_type : "Post",
        commentable_id : this.state.postId,
        body :this.state.myComment
      }
    }
    if(this.state.myComment){

      await axios.post('/comments', data).then(() =>{
        alert("댓글을 작성 하였습니다.")
      })
        .catch((err) => {
          alert("Failed to Write Comment : ", err)
        })
      this.getCommentInfo(this.state.postId)
      this.setState({myComment:''})
    }
    else{
      alert("댓글을 작성하여주세요")
    }
  }
  postDeclare = async() =>{
    // 신고 처리
    if(this.state.reportData && this.state.reportKind){
      const data = {
        report:{
          reportable_type: "Post",
          reportable_id: this.state.postId,
          category: this.state.reportKind,
          content:this.state.reportData
        }
      }
      console.log(data)
      await this.setState({visibleModal: 0})
      return axios.post('/reports ', data)
        .then(() => {
          alert('게시글 신고가 완료되었습니다.')

        }).catch((err) => {
          console.log(err)
          alert('게시글 신고가 실패하였습니다.')
        })
    }
  }

  removePost = async() =>{
    if(this.state.isMyPost){
      alert("게시글을 삭제하였습니다")
      const params = {
        params: {
          user_id: this.state.userData.id
        }
      }
      await this.setState({visibleModal: 0})
      axios.delete('/posts/' + this.state.postId, params)
        .then(() => {
          alert('게시글 삭제가 완료되었습니다.')
          this.props.navigation.goBack(null)
        }).catch((err) => {
          console.log(err)
          alert('게시글 삭제가 실패하였습니다.')
        })
    }
  }
  modifyPost = async() =>{
    /*
      Todo
      1.props로 기존 post data 넘겨주기
 */
    await this.setState({visibleModal: 0})
    this.props.navigation.navigate("ModifyPost", {postData:this.state.postData})
  }
  onClickLike = async() => {
    const data = {
      liker:"user",
      likeable:"post",
      likeable_id :this.state.postId
    }
    const params = {
      params: {
        user_info: true,
        filter_info: true,
        tag_info: true,
        like_info: true
      }
    }
    await axios.post('/likes', data)
    const res = await axios.get('/posts/' + this.state.postId, params)
    await this.setState({postData : res.data})
  }

  renderTagRow = (data) => {
    return (
      <Button
        style={{
          backgroundColor: '#1E1E1E',
          marginRight:5,
          marginTop: 10,
          borderRadius:10,
        }}>
        <Text
          style={{
            color: 'white',
          }}>{data}</Text>
      </Button>
    )
  }

  render () {
    return (
      <Screen
        style={{backgroundColor: '#1E1E1E'}}
      >
        <NavigationBar
          styleName='inline clear'
          style={{
            container: {
              backgroundColor: '#1E1E1E'
            },
          }}
          centerComponent={<Title title={'Details'}/>}
          rightComponent={
            <View
              style={{marginTop: 25}}
              styleName="horizontal space-between ">
              <TouchableOpacity onPress={() => {this.onClickCart()}}>
                <Image
                  source={ require('../../assets/image/add-to-cart.png' )}
                  style={{ width: 22, height: 22, color :'white', marginRight : 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickPreview}>
                <Image
                  source={ require('../../assets/image/photo-camera.png' )}
                  style={{ width: 23, height: 23, color :'white', marginRight : 20 }}
                />
              </TouchableOpacity>
            </View>
          }
        />
        <ScrollView styleName = "fill-parent">    
          <View 
            style={{
              flexDirection:'row',
              paddingTop:10,
              marginTop:10,
              marginBottom:20
            }}
          >
            <Image  
              source={{
                uri:  "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg"
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 37.5
              }}/>

            <View>
              <Subtitle 
                style={{
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginTop: 5,
                  marginLeft: 15
                }}
              >
                {this.state.userData.username}
              </Subtitle>
              <Text>
                {this.state.userData.created_at}
              </Text>
            </View>
            <View style = { styles.container }>
              <Modal
                isVisible={this.state.visibleModal === 1}
                animationType={'slide'}
                overlayBackground={'rgba(0, 0, 0, 0.75)'}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({visibleModal: 0})}
                closeOnTouchOutside={true}
                style={styles.bottomModal}
              >
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({visibleModal: 2})}
                    style={styles.button}>
                    <Text 
                      style={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                        신고</Text>
                  </TouchableOpacity>
                  {this.state.isMyPost &&
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.removePost}>
                    <Text 
                      style={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                        삭제</Text>
                  </TouchableOpacity>
                  }
                  {this.state.isMyPost &&
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.modifyPost}>
                    <Text 
                      style={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                        수정</Text>
                  </TouchableOpacity>
                  }
                </View>
              </Modal>
              <TouchableOpacity onPress={() => this.setState({visibleModal: 1})}>
                <Image
                  source={ require('../../assets/image/more.png' )}
                  style={{ width: 25, height: 25, color :'white', marginBottom :15, marginRight :15}}
                />
              </TouchableOpacity>
            </View>
            <Modal
              isVisible={this.state.visibleModal === 2}
              animationType={'slide'}
              overlayBackground={'rgba(0, 0, 0, 0.75)'}
              modalDidOpen={() => console.log('modal did open')}
              modalDidClose={() => this.setState({visibleModal: 0})}
              closeOnTouchOutside={true}
            >
              <View>
                <DropDownPicker
                  items={[
                    {label: 'insult', value: 'insult'},
                    {label: 'copyright', value: 'copyright'},
                  ]}
                  defaultValue={this.state.country}
                  placeholder="신고 유형 선택"
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#fafafa'}}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => this.setState({
                    reportKind: item.value
                  })}/>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  autoFocus={true}
                  maxLength={255}
                  textAlignVertical={'top'}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({reportData: text})}/>
                    
                <View style ={{flexDirection: 'row'}}>                    
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      this.setState({visibleModal: 0})
                    }}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>    
                  <TouchableOpacity
                    style={styles.submitbutton}
                    onPress={()=>{this.postDeclare()}}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>   
                </View>
              </View>
            </Modal>
          </View>

          {this.state.isLoading ? (
            <Spinner styleName='large'/>
          ) : (
            <Card
              style={{width: width}}
              styleName="flexible"
            >
              <ImageView
                images={this.state.imageFile}
                imageIndex={0}
                isVisible={this.state.isPreview}
                isSwipeCloseEnabled={true}
                onClose={() => {this.setState({isPreview: false})}}
              />

              <TouchableOpacity
                onPress={this.onClickPostImage}
              >
                <Image
                  style={{width: width, height: width}}
                  source={{ uri: AWS_S3_STORAGE_URL + this.state.postData.filter_info.filter_name}}
                />
              </TouchableOpacity>
              <View
                styleName="content"
                style={{
                  backgroundColor: '#1E1E1E',
                }}>
                <Heading
                  numberOfLines={2}
                  style={{
                    color: 'white',
                  }}>
                  {this.state.postData.post_info.title}
                </Heading>
                <View styleName="horizontal space-between">
                  <Subtitle style={{
                    color: 'white',
                    marginTop: 10
                  }}>판매 가격 : {this.state.postData.post_info.price}원</Subtitle>
                  <TouchableOpacity onPress={() => this.onClickLike(this.props)}>
                    <View styleName="horizontal space-between">
                      {this.state.postData.like_info.liked ? (
                        <Image
                          source={ require('../../assets/image/heart_pink.png' )}
                          style={{ width: 20, height: 20, color :'red', marginRight :10 }}
                        />
                      ) : (
                        <Image
                          source={ require('../../assets/image/heart-white.png' )}
                          style={{ width: 20, height: 20,  marginRight :10 }}
                        />
                      )}
                      <Text
                        style={{
                          color: 'white',
                        }}>
                        {this.state.postData.like_info.liked_count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <ListView
                  style={{
                    width: '50%',
                    listContent: {
                      backgroundColor: '#1E1E1E',
                    }
                  }}
                  data={this.state.postData.tag_info.tag_list}
                  horizontal={true}
                  renderRow={this.renderTagRow}
                />
                <Divider></Divider>
                <View
                  style={{
                    flex: 40,
                    backgroundColor: '#1E1E1E',
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {this.state.postData.post_info.description}
                  </Text>
                </View>
              </View>
            </Card>
          )}

          <View
            styleName="horizontal space-between"
            style ={{
              justifyContent: 'center',
              width: width,
              height: '4%',
              backgroundColor: '#1E1E1E',
            }}>
            <TextInput
              placeholder={'Write Comment'}
              style ={{
                placeholderTextColor: 'white',
                width: '90%',
                backgroundColor: '#1E1E1E',
              }}
              value={this.state.myComment}
              onChangeText={(text) => this.setState({myComment: text})}/>
            <TouchableOpacity onPress={() => this.postCommentInfo()}>
              <Image
                source={ require('../../assets/image/blogging.png' )}
                style={{ width: 25, height: 25, color :'white', marginBottom :15, marginRight :15}}
              />
            </TouchableOpacity>
          </View>
          {this.state.commentData.map((comment, id) => {
            return (
              <Comment
                key={id}
                comment = {comment.comment_info.body}
                name = {comment.user_info.author_name}
              />
            )
          })}
        </ScrollView>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor:  'rgba(0,0,0,0.2)',
  },
  button: {
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  submitbutton: {
    marginRight:50,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  closeButton: {
    height: 50,
    borderRadius: 6,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  input: {
    margin: 15,
    height: 200,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
})

export default DetailScreen