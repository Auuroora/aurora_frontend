import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions
} from 'react-native'
import { 
  ImageBackground,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Divider
} from '@shoutem/ui'

LargeTile.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  tempData: PropTypes.string
}

const { width, height } = Dimensions.get('window')

export default function LargeTile (props) {
  return (
    <TouchableOpacity
      onPress={props.onClickTile}
    >
      <ImageBackground
        styleName="large"
        style ={{width: width}}
        source={ props.image }
      >
        <Tile>
          <Title styleName="md-gutter-bottom">{props.title}</Title>
          <Subtitle styleName="sm-gutter-horizontal">{props.tempData}</Subtitle>
        </Tile>
      </ImageBackground>
    </TouchableOpacity>
  )
}