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
  TouchableOpacity
} from '@shoutem/ui'

LargeTile.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  tempData: PropTypes.string
}

const { width } = Dimensions.get('window')

export default function LargeTile (props) {
  return (
    <TouchableOpacity
      onPress={props.onClickTile}
    >
      <ImageBackground
        styleName="large"
        style ={{ width: width }}
        source={props.image}
      >
        <Tile styleName="clear">
          <Title styleName="md-gutter-bottom">{props.title}</Title>
          {props.image === null ? (
            <Subtitle 
              styleName="sm-gutter-horizontal"
              style={{color: '#FFFFFF'}}
            >
              {props.noImageComment}
            </Subtitle>
          ) : (null)}
        </Tile>
      </ImageBackground>
    </TouchableOpacity>
  )
}