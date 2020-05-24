import React from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import { 
  Image,
  TouchableOpacity,
  Caption
} from '@shoutem/ui'

FilterTile.propTypes = {
  size: PropTypes.oneOf('small', 'medium'),
  onPressTile: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.string
}

export default function FilterTile (props) {

  const { width, height } = Dimensions.get('window')

  let tileStyle = {
    width: width / 10,
    height: width / 10
  }

  return (
    <TouchableOpacity 
      onPress={() => props.onPressTile(props.title)}
      styleName="flexible"
      style={{
        backgroundColor: '#0A0A0A',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={props.image}
        style={tileStyle}
      >
      </Image>
      <Caption 
        styleName='h-center'
        style={{
          color: '#FEFEFE',
          width: 80
        }}
      >
        {props.title}
      </Caption>
    </TouchableOpacity>    
  )
}