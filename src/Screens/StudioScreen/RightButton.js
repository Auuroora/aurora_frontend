import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Icon
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
        <Icon name="stamp" />
      </Button>
    ) : 
    (
      <Button onPress={props.onPressNew}>
        <Icon name="edit" />
      </Button>
    )
}