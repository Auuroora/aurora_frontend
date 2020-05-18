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
  image: PropTypes.string,
  title: PropTypes.string,
  tempData: PropTypes.string
}

const { height } = Dimensions.get('window')
export default function LargeTile (props) {
  return (
    <TouchableOpacity 
      style ={{ height: height*0.4,padding :10}}
    >
      {props.image === null ? (
        <ImageBackground
          styleName="large"
          style ={{ height: height*0.1, width :height*0.1 ,padding :10}}
          source={ require('../../assets/image/plus.png') }
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{props.title}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{props.tempData}</Subtitle>
          </Tile>
        </ImageBackground>
      ) : (
        <ImageBackground
          styleName="large"
          style ={{ height: height*0.1, width :height*0.1 ,padding :10}}
          source={ require('../../assets/image/plus.png') }
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{props.title}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{props.tempData}</Subtitle>
          </Tile>
        </ImageBackground>
      )}
    </TouchableOpacity>
  )
}