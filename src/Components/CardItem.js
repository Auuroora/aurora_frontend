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
  console.log(props.postId)
  props.onClickLike(props.postId) 
}
export default function CardItem (props) {

  const moveToDetail = () => {
    props.navigation.navigate("Detail", {
      postId: props.postId,
      liked_count: props.liked_count,
      liked: props.liked_count,
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
            >{props.price}</Caption>
            <TouchableOpacity onPress={() => onPressFunction(props)}>
              <View styleName="horizontal space-between">
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
                <Text>{props.liked_count}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Tile>
    </TouchableOpacity>
  )
}