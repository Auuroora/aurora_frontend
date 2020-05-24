import React from 'react'
import PropTypes from 'prop-types'

import { 
  View,
  Button,
  Icon
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
        <Icon 
          name="close"
          style={{
            color: '#FFFFFF',
            margin: 10,
            marginTop: 40
          }}
        />
      </Button>
    ) : 
    (
      <View></View>
    )
}