import React from 'react'
import PropTypes from 'prop-types'

import { 
  View,
  Button,
  Text
} from '@shoutem/ui'

LeftButton.propTypes = {
  onPressCancel: PropTypes.func,
  isNewFilter: PropTypes.bool
}
const BtnText = {fontSize: 20, color: '#FFFFFF', marginTop: 10, marginLeft: 15}

export default function LeftButton (props) {
  return props.isNewFilter ? 
    (
      <Button onPress={props.onPressCancel}
      >
        <Text 
          name="close"
          style={BtnText}
        >
          X
        </Text>
      </Button>
    ) : 
    (
      <View></View>
    )
}