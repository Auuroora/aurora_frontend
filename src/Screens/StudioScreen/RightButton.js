import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Text,
  Spinner
} from '@shoutem/ui'

RightButton.propTypes = {
  onPressNew: PropTypes.func,
  onPressDone: PropTypes.func,
  isNewFilter: PropTypes.bool,
  isUploading: PropTypes.bool
}

export default function RightButton (props) {
  if (props.isUploading) {
    return (
      <Spinner
        style={{color: '#0395FF', marginTop: 40, marginRight: 15}}
      >

      </Spinner>
    )
  }
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