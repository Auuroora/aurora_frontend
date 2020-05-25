import React from 'react'
import PropTypes from 'prop-types'

import { 
  Image,
  TouchableOpacity,
} from '@shoutem/ui'

import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

Tile.propTypes = {
  image: PropTypes.string,
  filterId: PropTypes.number,
  onPressDone: PropTypes.func
}

const onPressFunction = (props) =>{
  props.onPressDone(props.filterId, props.image) 
}
export default function Tile (props) {
  return (
    <TouchableOpacity styleName="flexible" onPress={() =>onPressFunction(props)}>
      <Image
        style={{width: (1/3.2)* width, height: (1/3.2) * width}}
        styleName="medium-square"
        source={{ uri: props.image  }}
      />
    </TouchableOpacity>
  )
}