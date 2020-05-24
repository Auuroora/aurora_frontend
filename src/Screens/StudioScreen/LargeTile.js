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
        source={ { uri: 'data:image/jpeg;base64,' + props.image } }
      >
        <Tile styleName="clear">
          <Title styleName="md-gutter-bottom">{props.title}</Title>
          {props.image === null ? (
            <Subtitle 
              styleName="sm-gutter-horizontal"
              style={{color: '#000000'}}
            >
              {'이미지를 선택하고 필터를 적용하세요.'}
            </Subtitle>
          ) : (null)}
        </Tile>
      </ImageBackground>
    </TouchableOpacity>
  )
}