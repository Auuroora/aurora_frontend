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
  tempData: PropTypes.string
}

export default function CardItem (props) {
  return (
    <TouchableOpacity styleName="flexible" onPress={props.onPress}>
      <Card styleName="flexible">
        <Image
          style={{width: (1/3)* width, height: (1/3) * width}}
          styleName="medium-square"
          source={{ uri: props.image  }}
        />
      </Card>
    </TouchableOpacity>
  )
}