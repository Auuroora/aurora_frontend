import React from 'react'
import PropTypes from 'prop-types'

import { 
  View,
  Card,
  Image,
  Subtitle,
  TouchableOpacity,
  Caption
} from '@shoutem/ui'

CardItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  tempData: PropTypes.string
}

export default function CardItem (props) {
  return (
    <TouchableOpacity styleName="flexible">
      <Card styleName="flexible">
        <Image
          styleName="medium-wide"
          source={{ uri: props.image  }}
        />
        <View styleName="content">
          <Subtitle numberOfLines={3}>{props.title}</Subtitle>
          <View styleName="horizontal">
            <Caption styleName="collapsible" numberOfLines={2}>{props.tempData}</Caption>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}