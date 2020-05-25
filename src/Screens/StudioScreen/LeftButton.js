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

export default function LeftButton (props) {
  return props.isNewFilter ? 
    (
      <Button onPress={props.onPressCancel}
      >
        <Text 
          name="close"
          style={{
            color: '#FFFFFF',
            margin: 10,
            marginTop: 40
          }}
        >
          Close
        </Text>
      </Button>
    ) : 
    (
      <View></View>
    )
}