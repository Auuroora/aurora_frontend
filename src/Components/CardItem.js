import React from 'react'
import PropTypes from 'prop-types'

import { 
  View,
  Tile,
  Image,
  Subtitle,
  TouchableOpacity,
  Caption,
  Text,
  Button,
  Icon
} from '@shoutem/ui'

import { Dimensions } from 'react-native'
import axios from '../axiosConfig'

const { width } = Dimensions.get('window')

CardItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  postId: PropTypes.number,
  onClickLike: PropTypes.func
}
const onPressFunction = (props) =>{
  props.onClickLike(props.postId) 
}
export default function CardItem (props) {

  const moveToDetail = () => {
    props.navigation.navigate("Detail", {
      postId: props.postId,
      likedCount: props.likedCount,
      liked: props.liked_count,
      commentCount: props.commentCount,
    })
  }
  return (
    <TouchableOpacity 
      styleName="flexible"
      onPress={moveToDetail}
    >
      <Tile 
        styleName="flexible dark"
        style={{backgroundColor: '#222222'}}
      >
        <Image
          style={{width: (180/375) * width, height: (180/375) * width}}
          styleName="medium-square"
          source={{ uri: props.image  }}
        />
        <View styleName="content">
          <Subtitle numberOfLines={2}
            style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 16}}
          >
            {props.title}
          </Subtitle>
          <View styleName="horizontal space-between">
            <Caption
              style={{color: '#FFFFFF'}}
            >{props.price} 원</Caption>
            <View styleName="horizontal space-between">
              <View styleName="horizontal space-between">

                <Image
                  source={ require('../assets/image/comment.png' )}
                  style={{ width: 20, height: 20, color :'white', marginRight :5 }}
                />
                <Text>{props.commentCount}</Text>
              </View>
              <TouchableOpacity  onPress={() => onPressFunction(props)}>
                <View styleName="horizontal space-between" style ={{marginLeft:10}}>
                  {props.liked ? (
                    <Image
                      source={ require('../assets/image/heart_pink.png' )}
                      style={{ width: 20, height: 20, color :'white', marginRight :5 }}
                    />
                  ) : (
                    <Image
                      source={ require('../assets/image/heart-white.png' )}
                      style={{ width: 17, height: 17,  marginRight :5 }}
                    />
                  )}
                  <Text>{props.likedCount}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Tile>
    </TouchableOpacity>
  )
}