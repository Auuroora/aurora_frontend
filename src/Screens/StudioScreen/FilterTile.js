import React from 'react'
import { Dimensions } from 'react-native'

import { 
  ImageBackground,
  Tile,
  Text,
  TouchableOpacity,
  Overlay
} from '@shoutem/ui'

/* TODO
 * 1. Add Filter
 * 2. Add PropTypes
 */

export default function FilterTile (props) {

  const { width, height } = Dimensions.get('window')

  let tileStyle = {
    width: 0,
    height: 0
  }

  if (props.size === 'medium') {
    tileStyle.width = width / 3.5
    tileStyle.height = height / 12
  } 

  if (props.size === 'small') {
    tileStyle.width = width / 6
    tileStyle.height = width / 6
  }

  return (
    <TouchableOpacity 
      onPress={() => props.onPressTile(props.title)}
      styleName="flexible"
    >
      <ImageBackground
        source={{ uri: props.image }}
        style={tileStyle}
      >
        <Tile
          styleName='clear'
        >
          <Overlay styleName="fill-parent">
            <Text>
              {props.title}
            </Text>
          </Overlay>
        </Tile>
      </ImageBackground>
    </TouchableOpacity>    
  )
}