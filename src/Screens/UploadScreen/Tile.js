import React from 'react'
import PropTypes from 'prop-types'

import { 
  Card,
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

const childFunctionHere = (props) =>{
  props.onPressDone(props.filterId) 
}
export default function Tile (props) {
  return (
    <TouchableOpacity styleName="flexible" onPress={() =>childFunctionHere(props)}>
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