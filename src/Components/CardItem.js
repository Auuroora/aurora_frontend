import React from 'react'
import PropTypes from 'prop-types'

import { 
  View,
  Card,
  Image,
  Subtitle,
  TouchableOpacity,
  Caption,
  Icon
} from '@shoutem/ui'

import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

CardItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  postId: PropTypes.number
}

export default function CardItem (props) {

  const moveToDetail = () => {
    props.navigation.navigate("Detail", {
      postId: props.postId
    })
  }

  return (
    <TouchableOpacity 
      styleName="flexible"
      onPress={moveToDetail}
    >
      <Card styleName="flexible">
        <Image
          style={{width: (180/375) * width, height: (180/375) * width}}
          styleName="medium-square"
          source={{ uri: props.image  }}
        />
        <View styleName="content"
        >
          <Subtitle numberOfLines={2}>{props.title}</Subtitle>
          <View styleName="horizontal space-between">
            <Caption>{props.price}</Caption>
            <Icon name = "like"/>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}