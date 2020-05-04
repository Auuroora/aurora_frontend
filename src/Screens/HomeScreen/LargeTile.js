import React from 'react'
import PropTypes from 'prop-types'

import { 
  ImageBackground,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Divider
} from '@shoutem/ui'

LargeTile.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  tempData: PropTypes.string
}

export default function LargeTile (props) {
  return (
    <TouchableOpacity>
      <ImageBackground
        styleName="large"
        source={{ uri: props.image }}
      >
        <Tile>
          <Title styleName="md-gutter-bottom">{props.title}</Title>
          <Subtitle styleName="sm-gutter-horizontal">{props.tempData}</Subtitle>
        </Tile>
      </ImageBackground>
      <Divider styleName="line" />
    </TouchableOpacity>
  )
}