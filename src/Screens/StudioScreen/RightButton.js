import React from 'react'

import {
  Button,
  Icon
} from '@shoutem/ui'

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