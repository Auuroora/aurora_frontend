import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
  Text
} from '@shoutem/ui'

RightButton.propTypes = {
  onPressNew: PropTypes.func,
  onPressDone: PropTypes.func,
  isNewFilter: PropTypes.bool
}

export default function RightButton (props) {
  return props.isNewFilter ? 
    (
      <Button onPress={props.onPressDone}>
        <Text
          style={{color: '#0395FF', marginTop: 40, marginRight: 15}}
        >
          Done
        </Text>
      </Button>
    ) : 
    (
      <Button onPress={props.onPressNew}>
        <Text
          style={{color: '#0395FF', marginTop: 40, marginRight: 15}}
        >
          New
        </Text>
      </Button>
    )
}